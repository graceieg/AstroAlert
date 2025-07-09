"""
Satellite tracking and position calculation utilities for AstroAlert.
"""
import numpy as np
from typing import Dict, List, Tuple, Optional
from datetime import datetime, timedelta
from skyfield.api import load, wgs84, EarthSatellite
from skyfield.sgp4lib import EarthSatellite as SGP4Satellite
import pandas as pd

from config import CELESTRAK_BASE, CACHE_DIR
from utils import Cache

class SatelliteTracker:
    """Handles satellite tracking and position calculations."""
    
    def __init__(self):
        self.ts = load.timescale()
        self.cache = Cache()
        self.satellites: Dict[str, EarthSatellite] = {}
        self.last_updated = None
        
    def load_satellites(self, category: str = "active") -> bool:
        """
        Load satellite TLE data from CelesTrak.
        
        Args:
            category: Category of satellites to load (e.g., 'active', 'starlink', 'gps-ops')
            
        Returns:
            bool: True if satellites were loaded successfully
        """
        try:
            # Try to load from cache first
            cache_key = f"satellites_{category}"
            cached_data = self.cache.get(cache_key, max_age=timedelta(hours=1))
            
            if cached_data is not None:
                self.satellites = {}
                for sat_data in cached_data:
                    sat = EarthSatellite(
                        sat_data['line1'],
                        sat_data['line2'],
                        sat_data['name'],
                        self.ts
                    )
                    self.satellites[sat_data['name']] = sat
                self.last_updated = datetime.now()
                return True
                
            # If not in cache or expired, fetch from CelesTrak
            url = f"{CELESTRAK_BASE}/{category}.txt"
            satellites = load.tle_file(url)
            
            if not satellites:
                return False
                
            # Convert to dictionary by name
            self.satellites = {sat.name: sat for sat in satellites}
            self.last_updated = datetime.now()
            
            # Cache the results
            cache_data = [
                {
                    'name': sat.name,
                    'line1': sat.model.satnum,
                    'line2': sat.model.whichconst
                }
                for sat in satellites
            ]
            self.cache.set(cache_key, cache_data)
            
            return True
            
        except Exception as e:
            print(f"Error loading satellites: {e}")
            return False
    
    def get_satellite_position(self, sat_name: str, when: Optional[datetime] = None) -> Optional[Tuple[float, float, float]]:
        """
        Get the current position of a satellite.
        
        Args:
            sat_name: Name of the satellite
            when: Optional datetime to get position at (default: now)
            
        Returns:
            Tuple of (latitude, longitude, altitude_km) or None if not found
        """
        if sat_name not in self.satellites:
            return None
            
        sat = self.satellites[sat_name]
        ts = self.ts.now() if when is None else self.ts.utc(when)
        
        try:
            # Get position in Earth-Centered Inertial (ECI) coordinates
            position = sat.at(ts)
            
            # Convert to latitude/longitude/altitude
            lat, lon, alt = wgs84.latlon_of(position)
            
            return lat.degrees, lon.degrees, alt.km
        except Exception as e:
            print(f"Error getting position for {sat_name}: {e}")
            return None
    
    def get_visible_satellites(
        self, 
        lat: float, 
        lon: float, 
        alt: float = 0.0, 
        fov: float = 120.0,
        min_elevation: float = 10.0,
        when: Optional[datetime] = None
    ) -> List[Dict]:
        """
        Find satellites visible from a given location.
        
        Args:
            lat: Observer latitude (degrees)
            lon: Observer longitude (degrees)
            alt: Observer altitude (meters, default: 0.0)
            fov: Field of view in degrees (default: 120°)
            min_elevation: Minimum elevation to consider a satellite visible (degrees, default: 10°)
            when: Optional datetime to check (default: now)
            
        Returns:
            List of visible satellites with their positions and properties
        """
        if not self.satellites:
            return []
            
        ts = self.ts.now() if when is None else self.ts.utc(when)
        observer = wgs84.latlon(lat, lon, alt)
        visible_sats = []
        
        for name, sat in self.satellites.items():
            try:
                # Get satellite position
                difference = sat - observer
                topocentric = difference.at(ts)
                
                # Calculate elevation and azimuth
                alt_az = topocentric.altaz()
                elevation = alt_az[0].degrees
                azimuth = alt_az[1].degrees
                
                # Check if satellite is above horizon and within FOV
                if elevation >= min_elevation:
                    # Calculate distance and range rate
                    distance = topocentric.distance().km
                    
                    # Get satellite position in lat/lon/alt
                    sat_lat, sat_lon, sat_alt = wgs84.latlon_of(sat.at(ts))
                    
                    visible_sats.append({
                        'name': name,
                        'elevation': elevation,
                        'azimuth': azimuth,
                        'distance_km': distance,
                        'latitude': sat_lat.degrees,
                        'longitude': sat_lon.degrees,
                        'altitude_km': sat_alt.km
                    })
                    
            except Exception as e:
                print(f"Error processing satellite {name}: {e}")
                continue
                
        return visible_sats
    
    def get_satellite_orbit(self, sat_name: str, steps: int = 100) -> Optional[Dict]:
        """
        Calculate a satellite's orbit for visualization.
        
        Args:
            sat_name: Name of the satellite
            steps: Number of points to calculate in the orbit
            
        Returns:
            Dictionary with orbit points or None if satellite not found
        """
        if sat_name not in self.satellites:
            return None
            
        sat = self.satellites[sat_name]
        ts = self.ts.now()
        
        # Calculate orbit points (one orbit ~90 minutes)
        times = [ts + timedelta(minutes=i) for i in range(0, 90, 90//steps)]
        
        orbit_points = []
        for t in times:
            try:
                position = sat.at(self.ts.utc(t))
                lat, lon, alt = wgs84.latlon_of(position)
                orbit_points.append({
                    'time': t.utc_datetime(),
                    'latitude': lat.degrees,
                    'longitude': lon.degrees,
                    'altitude_km': alt.km
                })
            except Exception as e:
                print(f"Error calculating orbit point: {e}")
                continue
                
        return {
            'name': sat_name,
            'points': orbit_points,
            'color': self._get_satellite_color(sat_name)
        }
    
    def _get_satellite_color(self, sat_name: str) -> str:
        """Get a consistent color for a satellite based on its name."""
        # Simple hash function to generate a color
        hash_val = sum(ord(c) for c in sat_name)
        colors = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ]
        return colors[hash_val % len(colors)]

# Example usage
if __name__ == "__main__":
    tracker = SatelliteTracker()
    print("Loading satellites...")
    if tracker.load_satellites("active"):
        print(f"Loaded {len(tracker.satellites)} satellites")
        
        # Get position of a specific satellite
        sat_name = next(iter(tracker.satellites.keys()))
        pos = tracker.get_satellite_position(sat_name)
        if pos:
            print(f"{sat_name} position: {pos}")
            
        # Find visible satellites from New York
        nyc_lat, nyc_lon = 40.7128, -74.0060
        print(f"\nFinding satellites visible from NYC...")
        visible = tracker.get_visible_satellites(nyc_lat, nyc_lon)
        print(f"Found {len(visible)} visible satellites")
        
        if visible:
            # Sort by elevation (highest first)
            visible_sorted = sorted(visible, key=lambda x: x['elevation'], reverse=True)
            for sat in visible_sorted[:5]:  # Show top 5
                print(f"- {sat['name']}: {sat['elevation']:.1f}° elevation, {sat['distance_km']:.1f} km")
    else:
        print("Failed to load satellites")
