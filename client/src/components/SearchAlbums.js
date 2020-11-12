import React, { useState, useEffect, useContext } from 'react';
import { AlbumContext } from './AlbumContext';

import SearchedAlbum from './SearchedAlbum';

import axios from 'axios';
import qs from 'qs';

require('dotenv').config();

const SearchAlbums = () => {

    // Input States
    const [albumName, setAlbumName] = useState('');
    const [searchedAlbums, setSearchedAlbums] = useState('');
    const [loading, setLoading] = useState('');

    // Use album context
    const [albums, setAlbums] = useContext(AlbumContext);

    const searchAlbum = e => {
        e.preventDefault();
        
        if(albumName.trim().length !== 0) {
        
            setLoading(true);

            // Variables needed to get the access token for the Spotify API
            const client_id = process.env.REACT_APP_CLIENT_ID;
            const client_secret = process.env.REACT_APP_CLIENT_SECRET;
    
            const headers = {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: client_id,
                    password: client_secret,
                },
            };
            const data = {
                grant_type: 'client_credentials',
            };
            
            axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
                .then(data => {
    
                    const headers = {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + data.data.access_token
                        }
                    }
                    axios.get(`https://api.spotify.com/v1/search?q=album:${albumName}&type=album`, headers)
                        .then(response => {
                            displayTopAlbums(response.data);
                            setLoading(false);
                            selectAlbum();
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }

    const displayTopAlbums = data => {
        const albumItems = data.albums.items;

        // console.log(albumItems[0])

        const albumsDisplay = albumItems.slice(0, 6).map((album, index) => <SearchedAlbum data={album} key={album.id}/>)
        
        setSearchedAlbums(albumsDisplay)

    }

    const selectAlbum = () => {
        const albumsToSelect = document.querySelectorAll(".choose-album");
        for(let i = 0; i < albumsToSelect.length; i++) {
            albumsToSelect[i].addEventListener("click", () => {
                // Id of specific album, will be used to add data to album context
                const albumId = albumsToSelect[i].dataset.id;
                const albumName = albumsToSelect[i].dataset.albumname;
                const artistsName = albumsToSelect[i].dataset.artistsname;
                const numOfSongs = albumsToSelect[i].dataset.numofsongs;
                const albumImage = albumsToSelect[i].dataset.albumimage;
                const albumRating = "!rated";

                // Create new album object to update context
                let newAlbum = {
                    albumId: albumId,
                    album: albumName,
                    artists: artistsName,
                    numOfSongs: numOfSongs,
                    albumImage: albumImage,
                    albumRating: albumRating,
                }

                setAlbums(prevAlbums => [...prevAlbums, newAlbum])
                
                document.querySelector('.search-album').reset();
                setSearchedAlbums('');
                setAlbumName('');
            })
        }
    }

    const updateAlbumToSearch = e => {
        setAlbumName(e.target.value)
        if(e.target.value.trim().length == 0) {
            setSearchedAlbums('');
            setAlbumName('');
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-12 border">
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={searchAlbum} className="search-album form-inline justify-content-center mb-3">

                            <div className="form-group m-2 text-center">
                                <input type="text" className="form-control" id="search-album" placeholder="Search album..." value={albumName} onChange={updateAlbumToSearch} />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary m-2" id="search-album-submit">Search</button>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {
                            loading
                            ? <div className="row"><div className="col-md-12 text-center mt-3 mb-3"><p>Loading...</p></div></div>
                            : <div className="row">{searchedAlbums}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAlbums;