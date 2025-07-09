"""
Map visualization utilities for AstroAlert.
"""
import folium
import folium.plugins
import numpy as np
from typing import List, Dict, Tuple, Optional, Any
from datetime import datetime
import branca.colormap as cm

from config import DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM

class MapVisualizer:
    """Handles map visualizations for satellite and space weather data."""
    
    def __init__(self, center: Tuple[float, float] = DEFAULT_MAP_CENTER, zoom: int = DEFAULT_MAP_ZOOM):
        """
        Initialize the map visualizer.
        
        Args:
            center: Default map center as (lat, lon)
            zoom: Default zoom level
        """
        self.center = center
        self.zoom = zoom
        self.map = None
        self.feature_groups = {}
        
    def create_map(self) -> folium.Map:
        """Create a new Folium map."""
        self.map = folium.Map(
            location=self.center,
            zoom_start=self.zoom,
            tiles='CartoDB dark_matter',
            control_scale=True,
            prefer_canvas=True
        )
        
        # Add additional tile layers
        folium.TileLayer(
            'openstreetmap',
            name='OpenStreetMap'
        ).add_to(self.map)
        
        folium.TileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            name='Satellite',
            attr='Esri',
            max_zoom=19
        ).add_to(self.map)
        
        # Add layer control
        folium.LayerControl().add_to(self.map)
        
        return self.map
    
    def add_satellites(self, satellites: List[Dict], group_name: str = 'Satellites') -> None:
        """
        Add satellite markers to the map.
        
        Args:
            satellites: List of satellite dictionaries with 'latitude', 'longitude', and 'name' keys
            group_name: Name for the feature group
        """
        if not self.map:
            self.create_map()
            
        if group_name not in self.feature_groups:
            self.feature_groups[group_name] = folium.FeatureGroup(name=group_name)
            self.map.add_child(self.feature_groups[group_name])
            
        group = self.feature_groups[group_name]
        
        for sat in satellites:
            if 'latitude' not in sat or 'longitude' not in sat:
                continue
                
            # Create popup with satellite info
            popup_html = f"<b>{sat.get('name', 'Unknown')}</b><br>"
            if 'altitude_km' in sat:
                popup_html += f"Altitude: {sat['altitude_km']:.1f} km<br>"
            if 'elevation' in sat:
                popup_html += f"Elevation: {sat['elevation']:.1f}°<br>"
            if 'azimuth' in sat:
                popup_html += f"Azimuth: {sat['azimuth']:.1f}°<br>"
                
            # Create marker
            folium.CircleMarker(
                location=[sat['latitude'], sat['longitude']],
                radius=5,
                color=sat.get('color', '#3388ff'),
                fill=True,
                fill_color=sat.get('color', '#3388ff'),
                fill_opacity=0.7,
                popup=folium.Popup(popup_html, max_width=300),
                tooltip=sat.get('name', 'Satellite')
            ).add_to(group)
    
    def add_orbit(self, orbit_data: Dict, group_name: str = 'Orbits') -> None:
        """
        Add a satellite orbit to the map.
        
        Args:
            orbit_data: Dictionary with 'points' (list of dicts with 'latitude', 'longitude')
                       and 'name' keys
            group_name: Name for the feature group
        """
        if not self.map:
            self.create_map()
            
        if group_name not in self.feature_groups:
            self.feature_groups[group_name] = folium.FeatureGroup(name=group_name)
            self.map.add_child(self.feature_groups[group_name])
            
        group = self.feature_groups[group_name]
        
        # Create line for the orbit
        points = [(p['latitude'], p['longitude']) for p in orbit_data.get('points', [])]
        if len(points) < 2:
            return
            
        folium.PolyLine(
            points,
            color=orbit_data.get('color', '#ff7800'),
            weight=1.5,
            opacity=0.8,
            popup=folium.Popup(f"<b>Orbit: {orbit_data.get('name', 'Unknown')}</b>", max_width=300)
        ).add_to(group)
    
    def add_heatmap(self, data: List[Tuple[float, float, float]], 
                   radius: int = 15, blur: int = 15, 
                   max_zoom: int = 4, name: str = 'Heatmap') -> None:
        """
        Add a heatmap layer to the map.
        
        Args:
            data: List of (lat, lon, intensity) tuples
            radius: Radius of each point in the heatmap
            blur: Amount of blur
            max_zoom: The maximum zoom level where the heatmap is visible
            name: Name for the heatmap layer
        """
        if not self.map:
            self.create_map()
            
        # Create a gradient color scale
        gradient = {
            0.1: '#0000ff',   # Blue
            0.3: '#00ffff',   # Cyan
            0.5: '#00ff00',   # Green
            0.7: '#ffff00',   # Yellow
            0.9: '#ff0000'    # Red
        }
        
        # Create heatmap
        from folium.plugins import HeatMap
        
        heat_data = [[point[0], point[1], point[2]] for point in data]
        
        HeatMap(
            heat_data,
            radius=radius,
            blur=blur,
            max_zoom=max_zoom,
            gradient=gradient,
            name=name
        ).add_to(self.map)
    
    def add_ground_track(self, points: List[Dict], name: str = 'Ground Track') -> None:
        """
        Add a ground track to the map.
        
        Args:
            points: List of point dictionaries with 'latitude', 'longitude', and 'time' keys
            name: Name for the feature group
        """
        if not points:
            return
            
        if not self.map:
            self.create_map()
            
        if name not in self.feature_groups:
            self.feature_groups[name] = folium.FeatureGroup(name=name)
            self.map.add_child(self.feature_groups[name])
            
        group = self.feature_groups[name]
        
        # Create line for the ground track
        line_points = [(p['latitude'], p['longitude']) for p in points]
        if len(line_points) < 2:
            return
            
        # Add line
        folium.PolyLine(
            line_points,
            color='#ff7800',
            weight=2,
            opacity=0.8,
            popup=folium.Popup(f"<b>{name}</b><br>Points: {len(points)}", max_width=300)
        ).add_to(group)
        
        # Add start and end markers
        start_time = points[0].get('time', 'Unknown')
        end_time = points[-1].get('time', 'Unknown')
        
        folium.CircleMarker(
            location=line_points[0],
            radius=5,
            color='#00ff00',
            fill=True,
            fill_color='#00ff00',
            fill_opacity=1.0,
            popup=folium.Popup(f"<b>Start</b><br>Time: {start_time}", max_width=300)
        ).add_to(group)
        
        folium.CircleMarker(
            location=line_points[-1],
            radius=5,
            color='#ff0000',
            fill=True,
            fill_color='#ff0000',
            fill_opacity=1.0,
            popup=folium.Popup(f"<b>End</b><br>Time: {end_time}", max_width=300)
        ).add_to(group)
    
    def add_geojson(self, geojson_data: Dict, name: str = 'GeoJSON', **kwargs) -> None:
        """
        Add a GeoJSON layer to the map.
        
        Args:
            geojson_data: GeoJSON data as a dictionary
            name: Name for the layer
            **kwargs: Additional arguments to pass to folium.GeoJson
        """
        if not self.map:
            self.create_map()
            
        if name not in self.feature_groups:
            self.feature_groups[name] = folium.FeatureGroup(name=name)
            self.map.add_child(self.feature_groups[name])
            
        # Add GeoJSON layer
        folium.GeoJson(
            geojson_data,
            name=name,
            **kwargs
        ).add_to(self.feature_groups[name])
    
    def add_legend(self, title: str = 'Legend', **kwargs) -> None:
        """
        Add a legend to the map.
        
        Args:
            title: Title of the legend
            **kwargs: Dictionary of {label: color} pairs
        """
        if not self.map:
            self.create_map()
            
        legend_html = f"""
        <div style="position: fixed; 
                    bottom: 50px; left: 50px; width: 150px; height: {len(kwargs) * 25 + 30}px; 
                    border:2px solid grey; z-index:9999; font-size:14px;
                    background-color:white; opacity: 0.9;
                    padding: 5px; border-radius: 5px;">
            <div style="text-align: center; font-weight: bold; margin-bottom: 5px;">{title}</div>
        """
        
        for label, color in kwargs.items():
            legend_html += f"""
            <div style="margin: 5px 0;">
                <i style="background:{color}; width: 20px; height: 15px; 
                           display: inline-block; margin-right: 5px;"></i>
                {label}
            </div>
            """
            
        legend_html += "</div>"
        
        self.map.get_root().html.add_child(folium.Element(legend_html))
    
    def save(self, filepath: str) -> None:
        """Save the map to an HTML file."""
        if not self.map:
            self.create_map()
        self.map.save(filepath)
        
    def _repr_html_(self) -> str:
        """Return HTML representation for Jupyter notebooks."""
        if not self.map:
            self.create_map()
        return self.map._repr_html_()


def create_space_weather_map(center: Tuple[float, float] = None, zoom: int = None) -> MapVisualizer:
    """
    Create a pre-configured map for space weather visualization.
    
    Args:
        center: Map center as (lat, lon)
        zoom: Zoom level
        
    Returns:
        Configured MapVisualizer instance
    """
    center = center or DEFAULT_MAP_CENTER
    zoom = zoom or DEFAULT_MAP_ZOOM
    
    m = MapVisualizer(center=center, zoom=zoom)
    m.create_map()
    
    # Add a scale bar
    folium.plugins.MousePosition().add_to(m.map)
    
    # Add fullscreen control
    folium.plugins.Fullscreen().add_to(m.map)
    
    # Add measure control
    folium.plugins.MeasureControl(
        position='topleft',
        primary_length_unit='kilometers',
        secondary_length_unit='miles',
        primary_area_unit='sqkilometers',
        secondary_area_unit='acres'
    ).add_to(m.map)
    
    return m
