""
Space weather service for fetching and processing space weather data.
"""
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional

import httpx
from pydantic import BaseModel, HttpUrl

from app.core.config import settings
from app.services.base import BaseService

class SpaceWeatherData(BaseModel):
    """Space weather data model."""
    timestamp: datetime
    kp_index: float
    solar_flux: float
    solar_wind_speed: float
    geomagnetic_storm: bool
    solar_flare: bool

class SpaceWeatherService(BaseService[SpaceWeatherData]):
    """Service for fetching and processing space weather data."""
    
    def __init__(self):
        super().__init__()
        self.base_url = "https://services.swpc.noaa.gov"
        self.timeout = 10.0
    
    async def get_current_conditions(self) -> Dict[str, Any]:
        """Get current space weather conditions."""
        cache_key = "space_weather:current"
        
        async def fetch() -> Dict[str, Any]:
            """Fetch current space weather data from NOAA."""
            urls = {
                'kp_index': f"{self.base_url}/products/noaa-planetary-k-index-1-minute.json",
                'solar_flux': f"{self.base_url}/json/27-day-observed-solar-indices.json",
                'solar_wind': f"{self.base_url}/json/ace/swepam/ace_swepam_1h.json",
                'alerts': f"{self.base_url}/json/alerts.json"
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                # Fetch all data in parallel
                responses = await asyncio.gather(
                    *[client.get(url) for url in urls.values()],
                    return_exceptions=True
                )
                
                # Process responses
                data = {}
                for idx, (key, url) in enumerate(urls.items()):
                    try:
                        response = responses[idx]
                        if isinstance(response, Exception):
                            raise response
                        response.raise_for_status()
                        data[key] = response.json()
                    except Exception as e:
                        self.logger.error(f"Error fetching {key} from {url}: {e}")
                        data[key] = None
                
                # Process KP index
                kp_index = 0.0
                if data.get('kp_index'):
                    kp_data = data['kp_index']
                    if kp_data and 'time_tag' in kp_data and 'kp_index' in kp_data:
                        kp_index = float(kp_data['kp_index'])
                
                # Process solar flux
                solar_flux = 0.0
                if data.get('solar_flux') and 'observed_ssn' in data['solar_flux']:
                    ssn_data = data['solar_flux']['observed_ssn']
                    if ssn_data and 'ssn' in ssn_data and ssn_data['ssn']:
                        solar_flux = float(ssn_data['ssn'][-1][1])
                
                # Process solar wind
                solar_wind_speed = 0.0
                if data.get('solar_wind') and 'data' in data['solar_wind']:
                    wind_data = data['solar_wind']['data']
                    if wind_data:
                        # Get the most recent non-null speed
                        for entry in reversed(wind_data):
                            if len(entry) > 1 and entry[1] is not None:
                                solar_wind_speed = float(entry[1])
                                break
                
                # Check for alerts
                alerts = data.get('alerts', {})
                geomagnetic_storm = any(
                    'geomagnetic storm' in alert.get('message', '').lower()
                    for alert in alerts.get('alerts', [])
                )
                solar_flare = any(
                    'solar flare' in alert.get('message', '').lower()
                    for alert in alerts.get('alerts', [])
                )
                
                return {
                    'timestamp': datetime.utcnow(),
                    'kp_index': kp_index,
                    'solar_flux': solar_flux,
                    'solar_wind_speed': solar_wind_speed,
                    'geomagnetic_storm': geomagnetic_storm,
                    'solar_flare': solar_flare
                }
        
        # Get from cache or fetch fresh
        return await self.get_cached_or_fetch(
            key=cache_key,
            fetch_func=fetch,
            ttl=300  # 5 minutes
        )
    
    async def get_forecast(self, days: int = 3) -> List[Dict[str, Any]]:
        """Get space weather forecast for the next N days."""
        cache_key = f"space_weather:forecast:{days}d"
        
        async def fetch() -> List[Dict[str, Any]]:
            """Fetch space weather forecast from NOAA."""
            url = f"{self.base_url}/products/3-day-forecast.json"
            
            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.get(url)
                    response.raise_for_status()
                    forecast_data = response.json()
                    
                    # Process forecast data
                    forecast = []
                    now = datetime.utcnow()
                    
                    # Add current conditions
                    current = await self.get_current_conditions()
                    forecast.append(current)
                    
                    # Add forecast data if available
                    if 'forecast' in forecast_data:
                        for item in forecast_data['forecast'][:days]:
                            forecast.append({
                                'timestamp': datetime.fromisoformat(item['time_tag']),
                                'kp_index': float(item.get('kp_index', 0)),
                                'solar_flux': current['solar_flux'],  # Keep same as current
                                'solar_wind_speed': current['solar_wind_speed'],  # Keep same as current
                                'geomagnetic_storm': float(item.get('kp_index', 0)) >= 5.0,
                                'solar_flare': current['solar_flare']  # Keep same as current
                            })
                    
                    return forecast
                    
            except Exception as e:
                self.logger.error(f"Error fetching space weather forecast: {e}")
                # Return current conditions as fallback
                current = await self.get_current_conditions()
                return [current] * (days + 1)
        
        # Get from cache or fetch fresh
        return await self.get_cached_or_fetch(
            key=cache_key,
            fetch_func=fetch,
            ttl=3600  # 1 hour
        )
    
    async def get_alerts(self) -> Dict[str, Any]:
        """Get active space weather alerts."""
        cache_key = "space_weather:alerts"
        
        async def fetch() -> Dict[str, Any]:
            """Fetch space weather alerts from NOAA."""
            url = f"{self.base_url}/json/alerts.json"
            
            try:
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.get(url)
                    response.raise_for_status()
                    return response.json()
            except Exception as e:
                self.logger.error(f"Error fetching space weather alerts: {e}")
                return {
                    'alerts': [],
                    'error': str(e)
                }
        
        # Get from cache or fetch fresh
        return await self.get_cached_or_fetch(
            key=cache_key,
            fetch_func=fetch,
            ttl=60  # 1 minute
        )
