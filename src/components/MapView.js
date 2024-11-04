import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'; // Import MapLibre CSS

const MapView = () => {
    useEffect(() => {
        // Create a new map instance
        const map = new maplibregl.Map({
            container: 'map', // The ID of the container where the map will be rendered
            style: 'https://tiles.stadiamaps.com/tiles/alidade_smooth.json', // Map style URL
            center: [-74.0060, 40.7128], // Initial map center (longitude, latitude)
            zoom: 12 // Initial zoom level
        });

        // Add navigation controls (zoom buttons and rotation)
        map.addControl(new maplibregl.NavigationControl());

        // Optional: Set the user's location as the center
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setCenter([longitude, latitude]);
            },
            () => {
                console.log("Geolocation not supported or permission denied.");
            }
        );

        // Cleanup function to remove the map instance on component unmount
        return () => {
            map.remove();
        };
    }, []);

    // Return the map container
    return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapView;
