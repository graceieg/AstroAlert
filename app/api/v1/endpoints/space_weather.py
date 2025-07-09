"""
Space weather API endpoints.
"""
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi_cache.decorator import cache
from pydantic import BaseModel, Field

from app.core.cache import cache
from app.services.space_weather import SpaceWeatherService

router = APIRouter()


class SpaceWeatherResponse(BaseModel):
    """Space weather response model."""
    
    timestamp: datetime = Field(..., description="Timestamp of the data")
    kp_index: float = Field(..., description="Planetary K-index (0-9)")
    solar_flux: float = Field(..., description="Solar flux at 10.7cm (sfu)")
    solar_wind_speed: float = Field(..., description="Solar wind speed (km/s)")
    geomagnetic_storm: bool = Field(..., description="Geomagnetic storm in progress")
    solar_flare: bool = Field(..., description="Solar flare in progress")
    
    class Config:
        json_schema_extra = {
            "example": {
                "timestamp": "2023-06-15T12:00:00Z",
                "kp_index": 3.67,
                "solar_flux": 78.5,
                "solar_wind_speed": 450.2,
                "geomagnetic_storm": False,
                "solar_flare": False,
            }
        }


@router.get("/current", response_model=SpaceWeatherResponse)
@cache(expire=300)  # Cache for 5 minutes
async def get_current_space_weather(
    service: SpaceWeatherService = Depends(SpaceWeatherService)
) -> SpaceWeatherResponse:
    """
    Get current space weather conditions.
    """
    try:
        data = await service.get_current_conditions()
        return SpaceWeatherResponse(**data)
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error fetching space weather data: {str(e)}"
        )


@router.get("/forecast", response_model=List[SpaceWeatherResponse])
@cache(expire=3600)  # Cache for 1 hour
async def get_space_weather_forecast(
    days: int = Query(3, ge=1, le=7, description="Number of days to forecast"),
    service: SpaceWeatherService = Depends(SpaceWeatherService)
) -> List[SpaceWeatherResponse]:
    """
    Get space weather forecast for the next N days.
    """
    try:
        forecast = await service.get_forecast(days=days)
        return [SpaceWeatherResponse(**item) for item in forecast]
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error fetching space weather forecast: {str(e)}"
        )


@router.get("/alerts")
@cache(expire=60)  # Cache for 1 minute
async def get_space_weather_alerts(
    service: SpaceWeatherService = Depends(SpaceWeatherService)
) -> dict:
    """
    Get active space weather alerts and warnings.
    """
    try:
        return await service.get_alerts()
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error fetching space weather alerts: {str(e)}"
        )
