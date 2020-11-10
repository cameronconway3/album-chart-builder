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

        console.log(albumItems[0])

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

                // Create new album object to update context
                let newAlbum = {
                    album: albumName,
                    artists: artistsName,
                    numOfSongs: numOfSongs,
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
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={searchAlbum} className="search-album form-inline justify-content-center mb-3">
                    <div className="form-group m-2">
                        <label htmlFor="searchAlbum" className="mr-3">Search Album</label>
                        <input type="text" className="form-control" id="searchAlbum" placeholder="Enter album to search..." value={albumName} onChange={updateAlbumToSearch} />
                    </div>
                    <button className="btn btn-primary m-2">Search</button>
                </form>
            </div>
            <div className="col-md-12">
                {
                    loading
                    ? <div className="row"><div className="col-md-12 text-center mt-3 mb-3"><p>Loading...</p></div></div>
                    : <div className="row">{searchedAlbums}</div>
                }
            </div>
        </div>
    )
}

export default SearchAlbums;