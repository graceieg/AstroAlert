"""Logging configuration."""
import json
import logging
import logging.config
import sys
from pathlib import Path
from typing import Dict, Any

from pythonjsonlogger import jsonlogger

from app.core.config import settings


class JsonFormatter(jsonlogger.JsonFormatter):
    """Custom JSON formatter for structured logging."""
    
    def add_fields(
        self,
        log_record: Dict[str, Any],
        record: logging.LogRecord,
        message_dict: Dict[str, Any],
    ) -> None:
        super().add_fields(log_record, record, message_dict)
        if not log_record.get('timestamp'):
            log_record['timestamp'] = record.created
        if log_level := log_record.get('level'):
            log_record['level'] = log_level.upper()
        else:
            log_record['level'] = record.levelname


def setup_logging() -> None:
    """Setup logging configuration."""
    log_level = settings.LOG_LEVEL.upper()
    log_format = settings.LOG_FORMAT.lower()
    
    # Create logs directory if it doesn't exist
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)
    
    # Base logging config
    logging_config: Dict[str, Any] = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "json": {
                "()": "app.core.logging.JsonFormatter",
                "format": "%(asctime)s %(levelname)s %(name)s %(message)s",
            },
            "console": {
                "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            },
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": log_level,
                "formatter": "console" if log_format != "json" else "json",
                "stream": sys.stdout,
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": log_level,
                "formatter": "json",
                "filename": log_dir / "astroalert.log",
                "maxBytes": 10485760,  # 10MB
                "backupCount": 5,
                "encoding": "utf8",
            },
        },
        "loggers": {
            "app": {
                "handlers": ["console", "file"],
                "level": log_level,
                "propagate": False,
            },
            "uvicorn": {
                "handlers": ["console", "file"],
                "level": log_level,
                "propagate": False,
            },
            "fastapi": {
                "handlers": ["console", "file"],
                "level": log_level,
                "propagate": False,
            },
            "": {
                "handlers": ["console", "file"],
                "level": log_level,
            },
        },
    }
    
    # Apply logging config
    logging.config.dictConfig(logging_config)
    
    # Configure third-party loggers
    logging.getLogger("httpx").setLevel("WARNING")
    logging.getLogger("httpcore").setLevel("WARNING")
    logging.getLogger("urllib3").setLevel("WARNING")
    
    # Log configuration loaded
    logger = logging.getLogger(__name__)
    logger.info("Logging configured", extra={"log_level": log_level, "format": log_format})
