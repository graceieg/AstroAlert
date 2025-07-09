""
API v1 router configuration.
"""
from fastapi import APIRouter

from app.api.v1.endpoints import space_weather, satellites

# Create API router
api_router = APIRouter()

# Include endpoints
api_router.include_router(
    space_weather.router,
    prefix="/space-weather",
    tags=["Space Weather"],
)

api_router.include_router(
    satellites.router,
    prefix="/satellites",
    tags=["Satellites"],
)
