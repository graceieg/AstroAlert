"""
Satellites API endpoints.
"""
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi_cache.decorator import cache
from pydantic import BaseModel, Field, validator

from app.core.cache import cache
from app.services.satellites import SatelliteService

router = APIRouter()


class Position(BaseModel):
    """Satellite position model."""
    
    latitude: float = Field(..., description="Latitude in degrees")
    longitude: float = Field(..., description="Longitude in degrees")
    altitude: float = Field(..., description="Altitude in kilometers")
    timestamp: datetime = Field(..., description="Position timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "latitude": 40.7128,
                "longitude": -74.0060,
                "altitude": 400.5,
                "timestamp": "2023-06-15T12:00:00Z"
            }
        }


class Satellite(BaseModel):
    """Satellite information model."""
    
    id: int = Field(..., description="Satellite NORAD ID")
    name: str = Field(..., description="Satellite name")
    category: str = Field(..., description="Satellite category")
    tle_line1: str = Field(..., description="TLE line 1")
    tle_line2: str = Field(..., description="TLE line 2")
    last_updated: datetime = Field(..., description="Last TLE update timestamp")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": 25544,
                "name": "ISS (ZARYA)",
                "category": "stations",
                "tle_line1": "1 25544U 98067A   21167.49305556  .00000648  00000-0  18516-4 0  9991",
                "tle_line2": "2 25544  51.6430 208.9169 0003090 320.7755 218.9029 15.48901303286295",
                "last_updated": "2023-06-15T12:00:00Z"
            }
        }


class SatelliteWithPosition(Satellite):
    """Satellite model with current position."""
    
    position: Optional[Position] = Field(None, description="Current position")
    
    class Config(Satellite.Config):
        json_schema_extra = {
            **Satellite.Config.json_schema_extra,
            "example": {
                **Satellite.Config.json_schema_extra["example"],
                "position": Position.Config.json_schema_extra["example"]
            }
        }


@router.get("/", response_model=List[Satellite])
@cache(expire=3600)  # Cache for 1 hour
async def list_satellites(
    category: Optional[str] = Query(None, description="Filter by category"),
    service: SatelliteService = Depends(SatelliteService)
) -> List[Satellite]:
    """
    List all tracked satellites, optionally filtered by category.
    """
    try:
        return await service.list_satellites(category=category)
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error fetching satellite list: {str(e)}"
        )


@router.get("/{satellite_id}", response_model=SatelliteWithPosition)
@cache(expire=60)  # Cache for 1 minute
async def get_satellite(
    satellite_id: int,
    include_position: bool = Query(True, description="Include current position"),
    service: SatelliteService = Depends(SatelliteService)
) -> SatelliteWithPosition:
    """
    Get detailed information about a specific satellite.
    """
    try:
        satellite = await service.get_satellite(satellite_id, include_position=include_position)
        if not satellite:
            raise HTTPException(status_code=404, detail="Satellite not found")
        return satellite
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error fetching satellite data: {str(e)}"
        )


@router.get("/{satellite_id}/positions", response_model=List[Position])
@cache(expire=300)  # Cache for 5 minutes
async def get_satellite_positions(
    satellite_id: int,
    duration: int = Query(90, ge=1, le=1440, description="Duration in minutes"),
    interval: int = Query(5, ge=1, le=60, description="Interval in minutes"),
    service: SatelliteService = Depends(SatelliteService)
) -> List[Position]:
    """
    Get predicted positions for a satellite over time.
    """
    try:
        positions = await service.get_satellite_positions(
            satellite_id,
            duration_minutes=duration,
            interval_minutes=interval
        )
        if not positions:
            raise HTTPException(status_code=404, detail="Satellite not found")
        return positions
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Error calculating satellite positions: {str(e)}"
        )
