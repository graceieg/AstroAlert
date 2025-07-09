#!/usr/bin/env python3
"""
Test script for AstroAlert
"""
import sys
import os
import pandas as pd
from datetime import datetime, timedelta

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from data_ingestion import DataFetcher, DataProcessor
from utils import Cache, haversine_distance, format_duration

def test_data_fetching():
    """Test data fetching functionality."""
    print("Testing data fetching...")
    
    fetcher = DataFetcher()
    processor = DataProcessor()
    
    # Test GOES X-ray data
    print("\nFetching GOES X-ray data...")
    xray_data = fetcher.fetch_goes_xray()
    if xray_data:
        df = processor.process_xray_data(xray_data)
        print(f"Retrieved {len(df)} X-ray data points")
        if not df.empty:
            print(f"Latest X-ray flux: {df.iloc[-1]['flux']} at {df.iloc[-1]['time_tag']}")
    
    # Test Kp index data
    print("\nFetching Kp index data...")
    kp_data = fetcher.fetch_kp_index()
    if kp_data:
        df = processor.process_kp_data(kp_data)
        print(f"Retrieved {len(df)} Kp index data points")
        if not df.empty:
            print(f"Latest Kp index: {df.iloc[-1]['kp_index']} at {df.iloc[-1]['time_tag']}")
    
    # Test TLE data
    print("\nFetching satellite TLE data...")
    tle_data = fetcher.fetch_satellite_tle("starlink")
    if tle_data:
        lines = tle_data.split('\n')
        print(f"Retrieved TLE data for {len(lines)//3} satellites")
        if len(lines) >= 3:
            print("Sample satellite:")
            print("\n".join(lines[:3]))

def test_utils():
    """Test utility functions."""
    print("\nTesting utility functions...")
    
    # Test cache
    print("\nTesting cache...")
    cache_key = "test_key"
    test_data = {"message": "Hello, World!", "timestamp": datetime.now().isoformat()}
    print(f"Setting cache value: {test_data}")
    Cache.set(cache_key, test_data)
    
    cached_value = Cache.get(cache_key)
    print(f"Retrieved cache value: {cached_value}")
    
    # Test haversine distance
    print("\nTesting haversine distance...")
    # New York to Los Angeles
    nyc = (40.7128, -74.0060)
    la = (34.0522, -118.2437)
    distance = haversine_distance(nyc[0], nyc[1], la[0], la[1])
    print(f"Distance between NYC and LA: {distance:.1f} km")
    
    # Test duration formatting
    print("\nTesting duration formatting...")
    durations = [5, 65, 3605, 86465, 90061]
    for seconds in durations:
        print(f"{seconds} seconds = {format_duration(seconds)}")

if __name__ == "__main__":
    print("=== AstroAlert Test Script ===\n")
    
    # Run tests
    test_data_fetching()
    test_utils()
    
    print("\nAll tests completed!")
