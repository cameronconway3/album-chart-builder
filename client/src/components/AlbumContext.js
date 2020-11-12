import React, { useState, createContext } from 'react';

export const AlbumContext = createContext();

export const AlbumProvider = props => {

    const [albums, setAlbums] = useState([]);

    return (
        <AlbumContext.Provider value={[albums, setAlbums]}>
            {/* Pass down to all components where the Provider is defined */}
            {props.children}
        </AlbumContext.Provider>
    );
}