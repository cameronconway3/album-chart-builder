import React, { useState, useContext, useEffect } from 'react';
import { AlbumContext } from './AlbumContext';

// Album Component
import Album from './Album';

const DisplayAlbums = () => {

    const [albums, setAlbums] = useContext(AlbumContext);

    useEffect(() => {
        const myAlbums = document.querySelectorAll(".my-albums");
    
        for(let i = 0; i < myAlbums.length; i++) {
            console.log(myAlbums[i])
            myAlbums[i].addEventListener("click", () => {
                const albumId = myAlbums[i].dataset.id;
                const albumName = myAlbums[i].dataset.albumname;
                const artistsName = myAlbums[i].dataset.artistsname;
                const numOfSongs = myAlbums[i].dataset.numofsongs;
                const albumImage = myAlbums[i].dataset.albumimage;
                const albumRating = myAlbums[i].dataset.albumrating;

                const myAlbumData = {
                    albumId: albumId,
                    albumName: albumName,
                    artistsName: artistsName,
                    numOfSongs: numOfSongs,
                    albumImage: albumImage,
                    albumRating: albumRating,
                }

                createModal(myAlbumData)

            })
        }
    })

    const createModal = (data) => {

    }

    return (
        // <div className="border border-dark">
            <div className="row justify-content-center">
                {albums.map( album => 
                    <Album
                        albumId = {album.albumId}
                        album = {album.album}
                        artists = {album.artists}
                        numOfSongs = {album.numOfSongs}
                        albumImage = {album.albumImage}
                        albumRating = {album.albumRating}
                        key = {album.albumId.toString()}
                    />
                )}
            {/* </div> */}
        </div>
    )
}

export default DisplayAlbums;