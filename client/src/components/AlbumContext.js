import React, { useState, createContext } from 'react';

export const AlbumContext = createContext();

export const AlbumProvider = props => {

    const [albums, setAlbums] = useState([
        {
            album: 'Some Rap Songs',
            artists: 'Earl Sweatshirt',
            numOfSongs: 15
        },
        {
            album: 'Disintegration',
            artists: 'The Cure',
            numOfSongs: 12
        },
        {
            album: 'Piñata',
            artists: 'Freddie Gibbs, Madlib',
            numOfSongs: 17
        },
        {
            album: '4:44',
            artists: 'Jay-Z',
            numOfSongs: 10
        }
    ]);

    return (
        <AlbumContext.Provider value={[albums, setAlbums]}>
            {/* Pass down to all components where the Provider is defined */}
            {props.children}
        </AlbumContext.Provider>
    );
}