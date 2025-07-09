""
Redis-based caching utility with support for:
- Time-based expiration
- Cache invalidation
- Cache versioning
- Connection pooling
"""
import json
import logging
from datetime import timedelta
from functools import wraps
from typing import Any, Callable, Optional, TypeVar, cast

import redis
from redis.exceptions import RedisError

from app.core.config import settings

# Type variable for generic function typing
F = TypeVar('F', bound=Callable[..., Any])

logger = logging.getLogger(__name__)

class Cache:
    """Redis-based caching implementation."""
    
    _instance = None
    _client = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Cache, cls).__new__(cls)
            cls._client = None
        return cls._instance
    
    def __init__(self):
        if self._client is None:
            try:
                self._client = redis.Redis.from_url(
                    str(settings.REDIS_URI),
                    decode_responses=True,
                    socket_connect_timeout=5,
                    socket_timeout=5,
                    retry_on_timeout=True,
                )
                # Test connection
                self._client.ping()
                logger.info("Connected to Redis cache")
            except (redis.ConnectionError, redis.TimeoutError) as e:
                logger.error(f"Failed to connect to Redis: {e}")
                self._client = None
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get a value from the cache."""
        if not self._client:
            return default
            
        try:
            value = self._client.get(key)
            if value is not None:
                try:
                    return json.loads(value)
                except json.JSONDecodeError:
                    return value
            return default
        except RedisError as e:
            logger.error(f"Cache get error for key {key}: {e}")
            return default
    
    def set(
        self,
        key: str,
        value: Any,
        expire: Optional[int] = None,
        nx: bool = False,
    ) -> bool:
        """Set a value in the cache."""
        if not self._client:
            return False
            
        try:
            if not isinstance(value, (str, int, float, bool)):
                value = json.dumps(value)
                
            return bool(
                self._client.set(
                    key,
                    value,
                    ex=expire,
                    nx=nx,
                )
            )
        except (RedisError, TypeError) as e:
            logger.error(f"Cache set error for key {key}: {e}")
            return False
    
    def delete(self, *keys: str) -> int:
        """Delete one or more keys from the cache."""
        if not self._client or not keys:
            return 0
            
        try:
            return self._client.delete(*keys)
        except RedisError as e:
            logger.error(f"Cache delete error for keys {keys}: {e}")
            return 0
    
    def expire(self, key: str, time: int) -> bool:
        """Set an expire flag on key for time seconds."""
        if not self._client:
            return False
            
        try:
            return bool(self._client.expire(key, time))
        except RedisError as e:
            logger.error(f"Cache expire error for key {key}: {e}")
            return False
    
    def ttl(self, key: str) -> int:
        """Get the TTL for a key."""
        if not self._client:
            return -2  # Key doesn't exist
            
        try:
            return self._client.ttl(key)
        except RedisError as e:
            logger.error(f"Cache TTL error for key {key}: {e}")
            return -2
    
    def cached(
        self,
        key: Optional[str] = None,
        ttl: int = 300,
        prefix: str = "cache",
    ) -> Callable[[F], F]:
        ""
        Decorator to cache function results.
        
        Args:
            key: Cache key (defaults to function name)
            ttl: Time to live in seconds
            prefix: Cache key prefix
        """
        def decorator(func: F) -> F:
            @wraps(func)
            def wrapper(*args, **kwargs):
                # Generate cache key if not provided
                cache_key = key or f"{prefix}:{func.__module__}:{func.__name__}"
                
                # Try to get from cache
                cached = self.get(cache_key)
                if cached is not None:
                    return cached
                
                # Call function and cache result
                result = func(*args, **kwargs)
                self.set(cache_key, result, expire=ttl)
                return result
            
            return cast(F, wrapper)
        return decorator

# Global cache instance
cache = Cache()
