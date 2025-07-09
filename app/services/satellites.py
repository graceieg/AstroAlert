"""
Satellite tracking and position calculation service.
"""
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple, Any

import httpx
from pydantic import BaseModel, HttpUrl
from skyfield.api import EarthSatellite, load, wgs84
from skyfield.timelib import Time

from app.core.config import settings
from app.services.base import BaseService

class SatelliteData(BaseModel):
    """Satellite data model."""
    id: int
    name: str
    category: str
    tle_line1: str
    tle_line2: str
    last_updated: datetime

class SatellitePosition(BaseModel):
    """Satellite position model."""
    latitude: float
    longitude: float
    altitude: float
    timestamp: datetime

class SatelliteService(BaseService[SatelliteData]):
    """Service for satellite tracking and position calculations."""
    
    def __init__(self):
        super().__init__()
        self.tle_url = "https://celestrak.org/NORAD/elements/gp.php"
        self.categories = {
            'stations': 'STATIONS',
            'weather': 'WEATHER',
            'noaa': 'NOAA',
            'goes': 'GOES',
            'active': 'ACTIVE',
            'geo': 'GEO',
        }
        self.timeout = 30.0
        self.epoch = datetime(2020, 1, 1)  # Reference epoch for Skyfield
        self.ts = load.timescale()
        self.satellites: Dict[str, EarthSatellite] = {}
    
    async def load_satellites(self, category: str = 'active') -> Dict[str, EarthSatellite]:
        """Load TLE data for a category of satellites."""
        cache_key = f"satellites:{category}"
        
        async def fetch() -> Dict[str, EarthSatellite]:
            """Fetch TLE data from Celestrak."""
            category_id = self.categories.get(category, 'ACTIVE')
            params = {
                'GROUP': category_id,
                'FORMAT': 'tle'
            }
            
            try:
                # Fetch TLE data
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.get(self.tle_url, params=params)
                    response.raise_for_status()
                    
                    # Parse TLE data
                    lines = response.text.strip().split('\n')
                    satellites = {}
                    
                    for i in range(0, len(lines), 3):
                        if i + 2 >= len(lines):
                            continue
                            
                        name = lines[i].strip()
                        line1 = lines[i+1].strip()
                        line2 = lines[i+2].strip()
                        
                        try:
                            # Extract NORAD ID from line 2
                            norad_id = int(line2.split()[1])
                            satellites[norad_id] = {
                                'name': name,
                                'category': category,
                                'tle_line1': line1,
                                'tle_line2': line2,
                                'last_updated': datetime.utcnow(),
                                'satellite': EarthSatellite(line1, line2, name, self.ts)
                            }
                        except (IndexError, ValueError) as e:
                            self.logger.warning(f"Error parsing TLE data for {name}: {e}")
                    
                    return satellites
                    
            except Exception as e:
                self.logger.error(f"Error fetching satellite TLE data: {e}")
                return {}
        
        # Get from cache or fetch fresh
        satellites = await self.get_cached_or_fetch(
            key=cache_key,
            fetch_func=fetch,
            ttl=3600  # 1 hour
        )
        
        # Update in-memory cache
        self.satellites.update(satellites)
        return satellites
    
    async def list_satellites(self, category: Optional[str] = None) -> List[Dict[str, Any]]:
        """List all tracked satellites, optionally filtered by category."""
        if not self.satellites:
            await self.load_satellites()
        
        # Filter by category if specified
        satellites = self.satellites.values()
        if category:
            satellites = [s for s in satellites if s['category'] == category]
        
        # Convert to list of dictionaries
        return [
            {
                'id': int(sat_id),
                'name': sat['name'],
                'category': sat['category'],
                'tle_line1': sat['tle_line1'],
                'tle_line2': sat['tle_line2'],
                'last_updated': sat['last_updated'].isoformat(),
            }
            for sat_id, sat in self.satellites.items()
        ]
    
    async def get_satellite(
        self,
        satellite_id: int,
        include_position: bool = True
    ) -> Optional[Dict[str, Any]]:
        """Get information about a specific satellite."""
        # Load satellites if not already loaded
        if not self.satellites:
            await self.load_satellites()
        
        # Find the satellite
        satellite_data = self.satellites.get(satellite_id)
        if not satellite_data:
            # Try to find in other categories
            for category in self.categories:
                if category != 'active':  # Skip active as it's already loaded
                    await self.load_satellites(category)
                    satellite_data = self.satellites.get(satellite_id)
                    if satellite_data:
                        break
            
            if not satellite_data:
                return None
        
        # Prepare result
        result = {
            'id': satellite_id,
            'name': satellite_data['name'],
            'category': satellite_data['category'],
            'tle_line1': satellite_data['tle_line1'],
            'tle_line2': satellite_data['tle_line2'],
            'last_updated': satellite_data['last_updated'].isoformat(),
        }
        
        # Calculate current position if requested
        if include_position and 'satellite' in satellite_data:
            try:
                ts = self.ts.now()
                sat = satellite_data['satellite']
                geocentric = sat.at(ts)
                subpoint = wgs84.subpoint(geocentric)
                
                result['position'] = {
                    'latitude': float(subpoint.latitude.degrees),
                    'longitude': float(subpoint.longitude.degrees),
                    'altitude': float(subpoint.elevation.km),
                    'timestamp': datetime.utcnow().isoformat(),
                }
            except Exception as e:
                self.logger.error(f"Error calculating satellite position: {e}")
        
        return result
    
    async def get_satellite_positions(
        self,
        satellite_id: int,
        duration_minutes: int = 90,
        interval_minutes: int = 5
    ) -> List[Dict[str, Any]]:
        """Get predicted positions for a satellite over time."""
        # Get satellite data
        satellite_data = await self.get_satellite(satellite_id, include_position=False)
        if not satellite_data or 'tle_line1' not in satellite_data:
            return []
        
        # Create satellite object
        sat = EarthSatellite(
            satellite_data['tle_line1'],
            satellite_data['tle_line2'],
            satellite_data['name'],
            self.ts
        )
        
        # Generate time points
        now = self.ts.now()
        times = [now + timedelta(minutes=i * interval_minutes).total_seconds() * 1.15741e-5 
                for i in range(duration_minutes // interval_minutes + 1)]
        
        # Calculate positions
        positions = []
        for t in times:
            try:
                geocentric = sat.at(t)
                subpoint = wgs84.subpoint(geocentric)
                
                positions.append({
                    'latitude': float(subpoint.latitude.degrees),
                    'longitude': float(subpoint.longitude.degrees),
                    'altitude': float(subpoint.elevation.km),
                    'timestamp': t.utc_datetime().isoformat(),
                })
            except Exception as e:
                self.logger.error(f"Error calculating position at time {t}: {e}")
        
        return positions
