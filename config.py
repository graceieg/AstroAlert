"""
Configuration settings for AstroAlert
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).parent.absolute()

# Data directories
DATA_DIR = BASE_DIR / "data"
CACHE_DIR = BASE_DIR / ".cache"

# Create directories if they don't exist
for directory in [DATA_DIR, CACHE_DIR]:
    directory.mkdir(exist_ok=True, parents=True)

# API Endpoints
NOAA_API_BASE = "https://services.swpc.noaa.gov/json"
CELESTRAK_BASE = "https://celestrak.org/NORAD/elements"

# Data refresh intervals (in seconds)
REFRESH_INTERVALS = {
    "goes_xray": 300,      # 5 minutes
    "kp_index": 900,       # 15 minutes
    "satellite_tle": 3600, # 1 hour
}

# Alert thresholds
ALERT_THRESHOLDS = {
    "solar_flare": {
        "C": 1.0,  # C1.0 and above
        "M": 0.0,  # M1.0 and above
        "X": 0.0   # X1.0 and above
    },
    "kp_index": 5,  # Kp index threshold for alerts
    "proton_flux": 10.0,  # pfu (proton flux units)
    "electron_flux": 1000.0  # pfu
}

# Satellite categories to track
SATELLITE_CATEGORIES = [
    "starlink",
    "gps-ops",
    "geo",
    "stations"
]

# Map settings
DEFAULT_MAP_CENTER = [39.50, -98.35]  # Center of continental US
DEFAULT_MAP_ZOOM = 4

# Application settings
APP_NAME = "AstroAlert"
VERSION = "0.1.0"
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# Email notifications (optional)
EMAIL_CONFIG = {
    "enabled": False,
    "smtp_server": os.getenv("SMTP_SERVER", "smtp.example.com"),
    "smtp_port": int(os.getenv("SMTP_PORT", 587)),
    "username": os.getenv("EMAIL_USERNAME", ""),
    "password": os.getenv("EMAIL_PASSWORD", ""),
    "from_email": os.getenv("FROM_EMAIL", "noreply@astroalert.example.com"),
    "admin_emails": ["admin@example.com"]
}

# Logging configuration
LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {
            "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
            "level": "INFO",
            "stream": "ext://sys.stdout"
        },
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "standard",
            "filename": str(BASE_DIR / "logs" / "astroalert.log"),
            "maxBytes": 10485760,  # 10MB
            "backupCount": 5,
            "encoding": "utf8"
        }
    },
    "loggers": {
        "": {  # root logger
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": True
        }
    }
}

# Create logs directory if it doesn't exist
(BASE_DIR / "logs").mkdir(exist_ok=True)
