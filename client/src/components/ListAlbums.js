import React, { useContext } from 'react';
import { AlbumContext } from './AlbumContext';

// Album Component
import Album from './Album';

const ListAlbums = () => {

    const [albums, setAlbums] = useContext(AlbumContext);

    return (
        <div>
            {albums.map( (album, index) => 
                <Album
                    album = {album.album}
                    artists = {album.artists}
                    numOfSongs = {album.numOfSongs}
                    key = {index.toString()}
                />
            )}
        </div>
    );
}

export default ListAlbums;