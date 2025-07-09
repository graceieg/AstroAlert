"""
AstroAlert Data Ingestion Module

This module handles fetching and processing real-time space weather data
from various sources including NOAA SWPC, NASA OMNIWeb, and CelesTrak.
"""
import os
import json
import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, Optional, Any

# Constants
NOAA_BASE_URL = "https://services.swpc.noaa.gov/json"
CELESTRAK_BASE_URL = "https://celestrak.org/NORAD/elements"

class DataFetcher:
    """Handles fetching of space weather and satellite data."""
    
    @staticmethod
    def fetch_goes_xray() -> Optional[Dict]:
        """Fetch GOES X-ray flux data."""
        try:
            url = f"{NOAA_BASE_URL}/goes/primary/xrays-1-day.json"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching GOES X-ray data: {e}")
            return None
    
    @staticmethod
    def fetch_kp_index() -> Optional[Dict]:
        """Fetch Kp index data."""
        try:
            url = f"{NOAA_BASE_URL}/planetary_k_index_1m.json"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"Error fetching Kp index data: {e}")
            return None
    
    @staticmethod
    def fetch_satellite_tle(category: str = "starlink") -> Optional[str]:
        """Fetch satellite TLE data from CelesTrak."""
        try:
            url = f"{CELESTRAK_BASE_URL}/{category}.txt"
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching {category} TLE data: {e}")
            return None

class DataProcessor:
    """Processes raw space weather data into usable formats."""
    
    @staticmethod
    def process_xray_data(raw_data: Dict) -> pd.DataFrame:
        """Process GOES X-ray flux data into a pandas DataFrame."""
        if not raw_data or not isinstance(raw_data, list):
            return pd.DataFrame()
        
        df = pd.DataFrame(raw_data)
        if 'time_tag' in df.columns:
            df['time_tag'] = pd.to_datetime(df['time_tag'])
            df = df.sort_values('time_tag')
        return df
    
    @staticmethod
    def process_kp_data(raw_data: Dict) -> pd.DataFrame:
        """Process Kp index data into a pandas DataFrame."""
        if not raw_data or not isinstance(raw_data, list):
            return pd.DataFrame()
        
        df = pd.DataFrame(raw_data)
        if 'time_tag' in df.columns:
            df['time_tag'] = pd.to_datetime(df['time_tag'])
            df = df.sort_values('time_tag')
        return df

def test_data_fetching():
    """Test function to verify data fetching is working."""
    print("Testing data fetching...")
    
    fetcher = DataFetcher()
    
    # Test GOES X-ray data
    print("Fetching GOES X-ray data...")
    xray_data = fetcher.fetch_goes_xray()
    if xray_data:
        print(f"Retrieved {len(xray_data)} X-ray data points")
    
    # Test Kp index data
    print("\nFetching Kp index data...")
    kp_data = fetcher.fetch_kp_index()
    if kp_data:
        print(f"Retrieved {len(kp_data)} Kp index data points")
    
    # Test TLE data
    print("\nFetching satellite TLE data...")
    tle_data = fetcher.fetch_satellite_tle()
    if tle_data:
        print(f"Retrieved TLE data for {len(tle_data.splitlines())//3} satellites")

if __name__ == "__main__":
    test_data_fetching()
