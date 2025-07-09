#!/bin/bash

# Create a virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create necessary directories
echo "Creating data directories..."
mkdir -p data/raw data/processed logs

# Run tests
echo "Running tests..."
python test_astroalert.py

# Start the application
echo -e "\nSetup complete! To start the application, run:\n"
echo "source venv/bin/activate  # On Windows: venv\Scripts\activate"
echo "streamlit run app.py"
echo -e "\nThen open your browser to http://localhost:8501"
