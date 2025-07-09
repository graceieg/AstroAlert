"""
Utility functions for AstroAlert
"""
import logging
import logging.config
from pathlib import Path
from datetime import datetime, timedelta
import json
import pandas as pd
import numpy as np
from typing import Any, Dict, List, Optional, Union

from config import LOGGING_CONFIG, CACHE_DIR

# Configure logging
logging.config.dictConfig(LOGGING_CONFIG)
logger = logging.getLogger(__name__)

def setup_logging():
    """Configure logging for the application."""
    logging.config.dictConfig(LOGGING_CONFIG)

class Cache:
    """Simple file-based caching system."""
    
    @staticmethod
    def _get_cache_path(key: str) -> Path:
        """Get the cache file path for a given key."""
        return CACHE_DIR / f"{key}.json"
    
    @staticmethod
    def get(key: str, max_age: Optional[timedelta] = None) -> Any:
        """
        Retrieve a value from the cache.
        
        Args:
            key: Cache key
            max_age: Maximum age of the cache entry (None for no expiration)
            
        Returns:
            Cached value or None if not found or expired
        """
        cache_file = Cache._get_cache_path(key)
        if not cache_file.exists():
            return None
            
        try:
            with open(cache_file, 'r') as f:
                data = json.load(f)
                
            # Check if cache entry is expired
            if max_age is not None:
                cache_time = datetime.fromisoformat(data['timestamp'])
                if datetime.now() - cache_time > max_age:
                    return None
                    
            return data['value']
            
        except (json.JSONDecodeError, KeyError, ValueError) as e:
            logger.warning(f"Error reading cache entry {key}: {e}")
            return None
    
    @staticmethod
    def set(key: str, value: Any):
        """
        Store a value in the cache.
        
        Args:
            key: Cache key
            value: Value to cache (must be JSON-serializable)
        """
        cache_file = Cache._get_cache_path(key)
        try:
            data = {
                'timestamp': datetime.now().isoformat(),
                'value': value
            }
            with open(cache_file, 'w') as f:
                json.dump(data, f, default=str)
        except (TypeError, OverflowError) as e:
            logger.error(f"Error caching value for {key}: {e}")

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance between two points 
    on the earth specified in decimal degrees.
    
    Args:
        lat1, lon1: Latitude and Longitude of point 1 (in decimal degrees)
        lat2, lon2: Latitude and Longitude of point 2 (in decimal degrees)
        
    Returns:
        Distance in kilometers
    """
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    
    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    c = 2 * np.arcsin(np.sqrt(a))
    
    # Radius of Earth in kilometers
    r = 6371.0
    return c * r

def parse_timestamp(timestamp: Union[str, datetime]) -> datetime:
    """
    Parse a timestamp string into a datetime object.
    
    Args:
        timestamp: Timestamp string or datetime object
        
    Returns:
        datetime object
    """
    if isinstance(timestamp, datetime):
        return timestamp
        
    # Try different datetime formats
    formats = [
        "%Y-%m-%dT%H:%M:%S.%fZ",  # ISO format with timezone
        "%Y-%m-%dT%H:%M:%S",       # ISO format without timezone
        "%Y-%m-%d %H:%M:%S",       # SQL datetime format
        "%Y-%m-%d"                  # Date only
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(timestamp, fmt)
        except (ValueError, TypeError):
            continue
            
    raise ValueError(f"Could not parse timestamp: {timestamp}")

def format_duration(seconds: float) -> str:
    """
    Format a duration in seconds into a human-readable string.
    
    Args:
        seconds: Duration in seconds
        
    Returns:
        Formatted duration string (e.g., "2h 30m 15s")
    """
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    days, hours = divmod(hours, 24)
    
    parts = []
    if days > 0:
        parts.append(f"{int(days)}d")
    if hours > 0 or days > 0:
        parts.append(f"{int(hours)}h")
    if minutes > 0 or hours > 0 or days > 0:
        parts.append(f"{int(minutes)}m")
    parts.append(f"{seconds:.1f}s")
    
    return " ".join(parts)

def safe_divide(numerator: float, denominator: float, default: float = 0.0) -> float:
    """
    Safely divide two numbers, returning a default value if division by zero.
    
    Args:
        numerator: Numerator
        denominator: Denominator
        default: Default value to return if division by zero
        
    Returns:
        Result of division or default value
    """
    try:
        return numerator / denominator
    except ZeroDivisionError:
        return default

def human_readable_size(size_bytes: int) -> str:
    """
    Convert a file size in bytes to a human-readable string.
    
    Args:
        size_bytes: Size in bytes
        
    Returns:
        Human-readable size string (e.g., "1.5 MB")
    """
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} PB"
