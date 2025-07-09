#!/bin/bash
# Script to compile requirements.txt with hashes

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip and install pip-tools
pip install --upgrade pip
pip install pip-tools

# Compile requirements
pip-compile --generate-hashes requirements.in -o requirements.txt

# Print success message
echo "Requirements compiled successfully to requirements.txt"
