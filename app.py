import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime, timedelta
import requests
from pathlib import Path
import time
import numpy as np
from typing import Dict, List, Optional, Tuple, Any

# Import custom modules
from processing.satellite_tracker import SatelliteTracker
from visualization.map_utils import MapVisualizer, create_space_weather_map
from data_ingestion import DataFetcher, DataProcessor
from config import (
    REFRESH_INTERVALS, 
    ALERT_THRESHOLDS, 
    SATELLITE_CATEGORIES,
    DEFAULT_MAP_CENTER,
    DEFAULT_MAP_ZOOM
)

# Set page config
st.set_page_config(
    page_title="AstroAlert – Space Weather Risk Detection System",
    page_icon="🛰️",
    layout="wide"
)

# Initialize session state for caching
if 'last_update' not in st.session_state:
    st.session_state.last_update = datetime.min
    st.session_state.satellite_data = None
    st.session_state.space_weather_data = None
    st.session_state.visible_satellites = []
    st.session_state.selected_satellite = None

# Initialize trackers
@st.cache_resource
def get_satellite_tracker():
    return SatelliteTracker()

tracker = get_satellite_tracker()

# Title and description
st.title("🛰️ AstroAlert")
st.markdown("### Real-Time Space Weather Risk Detection System")
st.markdown("---")

def fetch_space_weather_data() -> Dict[str, Any]:
    """Fetch real-time space weather data from various sources."""
    fetcher = DataFetcher()
    processor = DataProcessor()
    
    data = {}
    
    # Get GOES X-ray data
    xray_data = fetcher.fetch_goes_xray()
    if xray_data:
        data['xray'] = processor.process_xray_data(xray_data)
    
    # Get Kp index data
    kp_data = fetcher.fetch_kp_index()
    if kp_data:
        data['kp_index'] = processor.process_kp_data(kp_data)
    
    return data

def update_data():
    """Update all data sources if enough time has passed."""
    now = datetime.now()
    time_since_update = (now - st.session_state.last_update).total_seconds()
    
    if time_since_update > 60:  # Update at least once per minute
        with st.spinner("Updating data..."):
            # Update space weather data
            st.session_state.space_weather_data = fetch_space_weather_data()
            
            # Update satellite data
            if not tracker.satellites:
                tracker.load_satellites("active")
            
            # Update visible satellites (from NYC for demo)
            nyc_lat, nyc_lon = 40.7128, -74.0060
            st.session_state.visible_satellites = tracker.get_visible_satellites(
                nyc_lat, nyc_lon, min_elevation=10.0
            )
            
            st.session_state.last_update = now

def get_space_weather_metrics() -> Dict[str, Any]:
    """Extract key space weather metrics from the data."""
    if not st.session_state.space_weather_data:
        return {
            'xray_flux': {'value': 'N/A', 'trend': 'N/A'},
            'kp_index': {'value': 'N/A', 'trend': 'N/A'},
            'proton_flux': {'value': 'N/A', 'trend': 'N/A'},
            'status': 'No data'
        }
    
    data = st.session_state.space_weather_data
    metrics = {}
    
    # X-ray flux
    if 'xray' in data and not data['xray'].empty:
        xray = data['xray'].iloc[-1]
        prev_xray = data['xray'].iloc[-2] if len(data['xray']) > 1 else xray
        trend = xray['flux'] - prev_xray['flux']
        metrics['xray_flux'] = {
            'value': f"{xray['flux']:.1e} W/m²",
            'trend': f"{trend:+.1e} from last hour"
        }
    
    # Kp index
    if 'kp_index' in data and not data['kp_index'].empty:
        kp = data['kp_index'].iloc[-1]['kp_index']
        status = "Quiet"
        if kp >= 5:
            status = "Minor Storm"
        if kp >= 6:
            status = "Moderate Storm"
        if kp >= 7:
            status = "Strong Storm"
        if kp >= 8:
            status = "Severe Storm"
            
        metrics['kp_index'] = {
            'value': f"{kp:.1f}",
            'status': status
        }
    
    # Add a general status
    if 'kp_index' in metrics and metrics['kp_index']['status'] != "Quiet":
        metrics['status'] = "Active"
    else:
        metrics['status'] = "Normal"
    
    return metrics

def create_satellite_map() -> str:
    """Create a map with satellite positions and orbits."""
    # Create a new map
    m = create_space_weather_map()
    
    # Add visible satellites
    if st.session_state.visible_satellites:
        # Sort by elevation (highest first) and take top 20
        visible_sats = sorted(
            st.session_state.visible_satellites, 
            key=lambda x: x['elevation'], 
            reverse=True
        )[:20]
        
        # Add to map
        m.add_satellites(visible_sats, group_name="Visible Satellites")
    
    # Add selected satellite orbit if any
    if st.session_state.selected_satellite:
        sat_name = st.session_state.selected_satellite
        orbit = tracker.get_satellite_orbit(sat_name)
        if orbit:
            m.add_orbit(orbit, group_name="Selected Orbit")
    
    # Save to HTML and return the file path
    map_file = "satellite_map.html"
    m.save(map_file)
    return map_file

# Sidebar for controls
with st.sidebar:
    st.header("Controls")
    
    # Auto-refresh toggle
    auto_refresh = st.checkbox("Auto-refresh", value=True)
    refresh_interval = st.slider("Refresh interval (seconds)", 30, 300, 60, 30)
    
    # Satellite category selection
    selected_category = st.selectbox(
        "Satellite Category",
        SATELLITE_CATEGORIES,
        index=0
    )
    
    # Manual refresh button
    if st.button("Refresh Data"):
        st.session_state.last_update = datetime.min
        update_data()
        st.rerun()
    
    # Display system status
    st.markdown("---")
    st.subheader("System Status")
    st.metric("Last Update", st.session_state.last_update.strftime("%H:%M:%S"))
    
    if st.session_state.space_weather_data:
        status = get_space_weather_metrics()['status']
        status_color = "green" if status == "Normal" else "orange"
        st.markdown(f"**Space Weather Status**: :{status_color}[{status}]")
    
    # Display visible satellites count
    if st.session_state.visible_satellites:
        st.metric("Visible Satellites", len(st.session_state.visible_satellites))

# Main content
col1, col2 = st.columns([2, 1])

with col1:
    # Space weather status
    st.header("Current Space Weather Status")
    
    # Update data if needed
    update_data()
    
    # Display metrics
    metrics = get_space_weather_metrics()
    
    metric_col1, metric_col2, metric_col3 = st.columns(3)
    with metric_col1:
        st.metric(
            "Solar X-ray Flux", 
            metrics.get('xray_flux', {}).get('value', 'N/A'),
            metrics.get('xray_flux', {}).get('trend', '')
        )
    with metric_col2:
        st.metric(
            "Kp Index", 
            metrics.get('kp_index', {}).get('value', 'N/A'),
            metrics.get('kp_index', {}).get('status', '')
        )
    with metric_col3:
        st.metric(
            "Proton Flux", 
            "0.5 pfu",  # Placeholder
            "Normal"
        )
    
    # Satellite map
    st.subheader("Satellite Tracking")
    
    # Create and display the map
    map_file = create_satellite_map()
    with open(map_file, 'r', encoding='utf-8') as f:
        map_html = f.read()
    
    st.components.v1.html(map_html, height=500)
    
    # Satellite selection
    if st.session_state.visible_satellites:
        sat_names = [sat['name'] for sat in st.session_state.visible_satellites]
        selected = st.selectbox(
            "Select a satellite for details",
            ["None"] + sat_names,
            index=0
        )
        
        if selected != "None":
            st.session_state.selected_satellite = selected
    
    # Selected satellite details
    if st.session_state.selected_satellite:
        st.subheader(f"Satellite: {st.session_state.selected_satellite}")
        sat = next(
            (s for s in st.session_state.visible_satellites 
             if s['name'] == st.session_state.selected_satellite), 
            None
        )
        
        if sat:
            col1, col2 = st.columns(2)
            with col1:
                st.metric("Elevation", f"{sat['elevation']:.1f}°")
                st.metric("Azimuth", f"{sat['azimuth']:.1f}°")
            with col2:
                st.metric("Distance", f"{sat['distance_km']:,.1f} km")
                st.metric("Altitude", f"{sat['altitude_km']:,.1f} km")

with col2:
    # Alerts
    st.header("Alerts")
    alert_placeholder = st.empty()
    
    # Generate alerts based on thresholds
    alerts = []
    if 'kp_index' in metrics and metrics['kp_index']['status'] != "Quiet":
        alerts.append({
            'severity': 'warning',
            'message': f"Geomagnetic Storm: {metrics['kp_index']['status']} (Kp={metrics['kp_index']['value']})"
        })
    
    if not alerts:
        with alert_placeholder.container():
            st.info("No active space weather alerts")
    else:
        with alert_placeholder.container():
            for alert in alerts:
                if alert['severity'] == 'warning':
                    st.warning(alert['message'])
                elif alert['severity'] == 'error':
                    st.error(alert['message'])
                else:
                    st.info(alert['message'])
    
    # Recent events
    st.subheader("Recent Events")
    
    # Generate sample events (replace with real data)
    now = datetime.now()
    events = [
        {'time': now - timedelta(minutes=30), 'event': 'C1.2 Flare', 'severity': 'Low'},
        {'time': now - timedelta(hours=2), 'event': 'Kp=5 Storm', 'severity': 'Moderate'},
        {'time': now - timedelta(hours=5), 'event': 'M1.1 Flare', 'severity': 'Moderate'},
        {'time': now - timedelta(hours=8), 'event': 'Proton Flux Increase', 'severity': 'Low'},
        {'time': now - timedelta(hours=12), 'event': 'Kp=4 Storm', 'severity': 'Low'},
    ]
    
    # Display events in a table
    event_df = pd.DataFrame(events)
    st.dataframe(
        event_df,
        column_config={
            'time': 'Time',
            'event': 'Event',
            'severity': 'Severity'
        },
        hide_index=True,
        use_container_width=True
    )

# Auto-refresh
if auto_refresh:
    time.sleep(refresh_interval)
    st.rerun()

# Footer
st.markdown("---")
st.caption("Data sources: NOAA SWPC, NASA OMNIWeb, CelesTrak")

# For development
if __name__ == "__main__":
    st.stop()
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8501, reload=True)
