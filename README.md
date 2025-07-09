# 🛰️ AstroAlert

[![Python](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

Real-Time Space Weather Risk Detection and Satellite Tracking System

## 🌟 Overview

AstroAlert is an advanced monitoring system that provides real-time alerts and risk assessments for space weather events that could impact satellites, aviation, and power grids. The system integrates data from multiple sources to provide comprehensive space weather monitoring, satellite tracking, and impact analysis.

## 🚀 Features

### Core Features

- **Real-time Space Weather Monitoring**
  - Solar activity (flares, CMEs, radiation)
  - Geomagnetic storms and Kp index tracking
  - Solar wind and interplanetary magnetic field data

- **Satellite Operations**
  - Real-time satellite tracking and orbit visualization
  - Risk assessment based on space weather conditions
  - TLE data management and updates

- **Alerting System**
  - Configurable alert thresholds
  - Multiple notification channels (in-app, email, webhooks)
  - Historical alert tracking and analysis

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

- Python 3.9+
- Docker and Docker Compose (for containerized deployment)
- Redis (for caching)
- PostgreSQL (for persistent storage)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/astroalert.git
   cd astroalert
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   # Start Redis and PostgreSQL (requires Docker)
   docker-compose up -d redis postgres
   
   # Run database migrations
   alembic upgrade head
   
   # Start the application
   uvicorn app.main:app --reload
   ```

6. **Access the application**
   - API: Available at the configured host and port (default: 8000)
   - API Documentation: Available at `/docs` endpoint
   - Streamlit Dashboard: Available at the configured host and port (default: 8501)

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

- **CelesTrak**
  - Satellite Two-Line Element (TLE) data
  - Satellite catalog information

- **NASA OMNIWeb**
  - Historical space weather data
  - Solar wind and IMF parameters

## 📂 Project Structure

```
/astroalert/
  ├── app/                      # Application source code
  │   ├── api/                  # API endpoints
  │   │   └── v1/               # API version 1
  │   │       ├── endpoints/    # Route handlers
  │   │       └── api.py        # API router
  │   ├── core/                 # Core functionality
  │   │   ├── config.py         # Configuration
  │   │   ├── security.py       # Authentication and authorization
  │   │   └── logging.py        # Logging configuration
  │   ├── db/                   # Database models and migrations
  │   ├── models/               # Pydantic models
  │   ├── schemas/              # Database schemas
  │   ├── services/             # Business logic
  │   └── utils/                # Utility functions
  ├── tests/                    # Test suite
  ├── alembic/                  # Database migrations
  ├── docker/                   # Docker configuration
  ├── scripts/                  # Utility scripts
  ├── static/                   # Static files
  ├── .env.example              # Example environment variables
  ├── .gitignore
  ├── alembic.ini               # Alembic configuration
  ├── docker-compose.yml        # Docker Compose configuration
  ├── Dockerfile               # Docker configuration
  ├── main.py                  # Application entry point
  ├── pyproject.toml           # Project metadata
  └── README.md                # This file
```

## 🧪 Testing

Run the test suite:

```bash
# Install test dependencies
pip install -r requirements-test.txt

# Run tests
pytest

# Run tests with coverage
pytest --cov=app --cov-report=term-missing
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
- The open-source community for amazing tools and libraries

## 📚 Documentation

For detailed documentation, please see our [Documentation](https://astroalert.readthedocs.io).

## 📞 Support

For support, please open an issue in the [issue tracker](https://github.com/yourusername/astroalert/issues).
