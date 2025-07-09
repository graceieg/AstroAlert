# 🛰️ AstroAlert

[![Python](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.0-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

Real-Time Space Weather Monitoring, Alerting, and Satellite Tracking System

## 🌟 Overview

AstroAlert is an advanced monitoring system that provides real-time alerts and risk assessments for space weather events that could impact satellites, aviation, and power grids. The system integrates data from multiple sources including NOAA's Space Weather Prediction Center to provide comprehensive space weather monitoring, satellite tracking, and impact analysis.

Built with FastAPI and modern Python, AstroAlert offers a robust API for developers and a user-friendly interface for space weather enthusiasts and professionals.

## 🚀 Features

### Core Features

- **Real-time Space Weather Monitoring**
  - Solar activity (flares, CMEs, radiation)
  - Geomagnetic storms and Kp index tracking
  - Solar wind and interplanetary magnetic field data
  - Solar flux measurements
  - Real-time data visualization

- **Satellite Operations**
  - Real-time satellite tracking and orbit visualization
  - Pass prediction and visibility calculations
  - TLE data management and automatic updates
  - Impact assessment based on space weather conditions

- **Alerting System**
  - Configurable alert thresholds
  - Multiple notification channels (in-app, email, webhooks)
  - Historical alert tracking and analysis
  - WebSocket support for real-time updates

### Technical Features

- **Modern Architecture**
  - FastAPI backend with async support
  - Redis caching for improved performance
  - PostgreSQL with PostGIS for spatial data
  - Docker and Docker Compose for easy deployment

- **Data Processing**
  - Real-time data ingestion from multiple sources
  - Data validation and normalization
  - Caching and rate limiting

- **API**
  - RESTful API with OpenAPI documentation
  - JWT authentication
  - Rate limiting and request validation

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- Docker and Docker Compose (recommended)
- Redis (for caching)
- PostgreSQL (for persistent storage)

### Local Development with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AstroAlert.git
   cd AstroAlert
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - Prometheus Metrics: http://localhost:8000/metrics
   - Grafana Dashboard: http://localhost:3000 (if enabled)

### Manual Installation

1. **Set up Python environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

4. **Start the application**
   ```bash
   uvicorn app.main:app --reload
   ```

### Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Stop all services
docker-compose down
```

## 📊 Data Sources

- **NOAA Space Weather Prediction Center (SWPC)**
  - Real-time solar and geomagnetic data
  - Space weather alerts and forecasts
  - Kp index and solar flux measurements

- **CelesTrak**
  - Satellite Two-Line Element (TLE) data
  - Satellite catalog information
  - Orbital elements and tracking

- **NASA OMNIWeb**
  - Historical space weather data
  - Solar wind and IMF parameters
  - Geomagnetic indices

## 📂 Project Structure

```
AstroAlert/
├── app/                    # Application source code
│   ├── api/                # API routes and endpoints
│   │   └── v1/             # API version 1
│   │       ├── endpoints/   # Route handlers
│   │       └── api.py       # API router
│   ├── core/               # Core functionality
│   │   ├── config.py       # Configuration settings
│   │   ├── cache.py        # Caching utilities
│   │   └── logging.py      # Logging configuration
│   ├── services/           # Business logic
│   │   ├── base.py         # Base service class
│   │   ├── space_weather.py # Space weather service
│   │   └── satellites.py   # Satellite tracking service
│   └── main.py             # Application entry point
├── data_ingestion/         # Data collection scripts
├── monitoring/             # Monitoring configuration
│   └── prometheus.yml      # Prometheus configuration
├── processing/             # Data processing scripts
├── tests/                  # Test suite
├── utils/                  # Utility functions
├── visualization/          # Data visualization tools
├── .env.example            # Example environment variables
├── .gitignore
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker configuration
├── requirements.txt        # Project dependencies
└── README.md              # This file
```

## 🧪 Testing

Run the test suite:

```bash
# Install test dependencies
pip install -r requirements-test.txt

# Run all tests
pytest

# Run tests with coverage
pytest --cov=app --cov-report=term-missing

# Run a specific test file
pytest tests/test_space_weather.py -v
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NOAA Space Weather Prediction Center** for real-time space weather data
- **NASA** for historical space weather data and research
- **CelesTrak** for satellite orbital data
- **FastAPI** for the awesome web framework
- **Skyfield** for astronomical calculations

## 📚 Documentation

For detailed API documentation, visit the interactive documentation at `/docs` when running the application locally.

## 📞 Support

For support, please open an issue in the [issue tracker](https://github.com/yourusername/AstroAlert/issues).

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style guidelines.
