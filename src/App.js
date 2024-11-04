// src/App.js

import React, { useState } from 'react';
import FileUpload from './components/FileUpload'; // Updated path

const App = () => {
    const [coordinates, setCoordinates] = useState([]);

    const handleDataProcessed = (data) => {
        // Assuming the columns are named 'LATITUDE' and 'LONGITUDE'
        const newCoordinates = data.map((row) => ({
            latitude: row.LATITUDE,
            longitude: row.LONGITUDE,
        })).filter(coord => coord.latitude && coord.longitude);

        setCoordinates(newCoordinates);
    };

    return (
        <div>
            <h1>Latitude and Longitude Map</h1>
            <FileUpload onDataProcessed={handleDataProcessed} />
            {/* The map will go here in the next steps */}
            <pre>{JSON.stringify(coordinates, null, 2)}</pre>
        </div>
    );
};

export default App;
