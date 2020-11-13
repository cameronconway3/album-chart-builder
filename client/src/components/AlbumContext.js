import React, { useState, createContext } from 'react';

export const AlbumContext = createContext();

export const AlbumProvider = props => {

    const [albums, setAlbums] = useState([]);
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