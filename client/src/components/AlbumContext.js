import React, { useState, createContext } from 'react';

export const AlbumContext = createContext();

export const AlbumProvider = props => {

    const [albums, setAlbums] = useState([]);
    const [albumsInChart, setAlbumsInChart] = useState(20)
    const [albumsPerRow, setAlbumsPerRow] = useState(8)

    const value = {
        albums,
        setAlbums,
        albumsInChart,
        setAlbumsInChart,
        albumsPerRow,
        setAlbumsPerRow,
    }


    return (
        <AlbumContext.Provider value={value}>
            {/* Pass down to all components where the Provider is defined */}
            {props.children}
        </AlbumContext.Provider>
    );
}