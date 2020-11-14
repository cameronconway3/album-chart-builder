import React, { useState, createContext } from 'react';

export const AlbumContext = createContext();

export const AlbumProvider = props => {

    // Always set the state of the albums to an empty array (this is easy to manipulate)
    const [albums, setAlbums] = useState([]);
    // Initialise the chart size state as 3x3
    const [chartSize, setChartSize] = useState('3x3');

    const value = {
        albums,
        setAlbums,
        chartSize,
        setChartSize,
    }

    return (
        <AlbumContext.Provider value={value}>
            {/* Pass down to all components where the Provider is defined */}
            {props.children}
        </AlbumContext.Provider>
    );
}