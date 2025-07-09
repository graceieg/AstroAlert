""
Base service class with common functionality.
"""
import logging
from typing import Any, Dict, Optional, TypeVar, Generic

from pydantic import BaseModel

from app.core.cache import cache
from app.core.config import settings

T = TypeVar('T', bound=BaseModel)

class BaseService(Generic[T]):
    """Base service with common functionality."""
    
    def __init__(self):
        self.logger = logging.getLogger(f"{__name__}.{self.__class__.__name__}")
        self.cache = cache
    
    async def get_cached_or_fetch(
        self,
        key: str,
        fetch_func: callable,
        ttl: int = 300,
        **fetch_kwargs
    ) -> Any:
        """
        Get data from cache or fetch it using the provided function.
        
        Args:
            key: Cache key
            fetch_func: Function to fetch data if not in cache
            ttl: Time to live in seconds
            **fetch_kwargs: Arguments to pass to fetch_func
            
        Returns:
            Cached or freshly fetched data
        """
        # Try to get from cache
        cached = self.cache.get(key)
        if cached is not None:
            self.logger.debug(f"Cache hit for key: {key}")
            return cached
            
        # Fetch fresh data
        self.logger.debug(f"Cache miss for key: {key}, fetching fresh data")
        data = await fetch_func(**fetch_kwargs)
        
        # Cache the result
        if data is not None:
            self.cache.set(key, data, expire=ttl)
            
        return data
