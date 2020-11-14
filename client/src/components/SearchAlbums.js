import React, { useState, useContext } from 'react';
import { AlbumContext } from './AlbumContext';

import SearchedAlbum from './SearchedAlbum';

import axios from 'axios';
import qs from 'qs';

import Header from './Header';

require('dotenv').config();

const SearchAlbums = () => {

    // Input States
    const [albumName, setAlbumName] = useState('');
    const [searchedAlbums, setSearchedAlbums] = useState('');
    const [loading, setLoading] = useState('');

    // Use album context
    const {
        setAlbums
    } = useContext(AlbumContext);

    const searchAlbum = e => {
        e.preventDefault();
        
        // If the search input has a value in it
        if(albumName.trim().length !== 0) {
        
            // Update the loading state to true until the end of the function when the data from the Spotify API has returned
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
            
            // Get the access token
            axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
                .then(data => {
    
                    const headers = {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + data.data.access_token
                        }
                    }
                    // Get the data relating to the value in the albumName state
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

    // Display albums returned from the search
    const displayTopAlbums = data => {
        const albumItems = data.albums.items;

        // Limit the amount of albums displayed from the search using 'slice'
        const albumsDisplay = albumItems.slice(0, 6).map( album => <SearchedAlbum data={album} key={album.id}/> )

        setSearchedAlbums(albumsDisplay)

    }

    // Select specific album returned from the search
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

                // Update albums state with new album, use the previous albums state and add new album (dont simply update the state with returned album)
                setAlbums(prevAlbums => [...prevAlbums, newAlbum])
                
                document.querySelector('.search-album').reset();
                setSearchedAlbums('');
                setAlbumName('');
            })
            
            // When mouse enters the specific returned album set all other results' opacity to 0.5 to hightlight user choice
            albumsToSelect[i].addEventListener("mouseenter", () => {
                albumsToSelect.forEach(element => {
                    if(element !== albumsToSelect[i]) {
                        element.style.opacity = "0.5";
                    }
                });
            })

            // When users mouse leaves the album set all the returned albums opacity back to 1
            albumsToSelect[i].addEventListener("mouseleave", () => {
                albumsToSelect.forEach(element => {
                    element.style.opacity = "1";
                });
            })
        }
    }

    // Update the albumName state when something is entered in the search bar
    const updateAlbumToSearch = e => {
        setAlbumName(e.target.value)
        if(e.target.value.trim().length == 0) {
            setSearchedAlbums('');
            setAlbumName('');
        }
    }

    return (
        <React.Fragment>
            <div className="row">
                <Header />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={searchAlbum} className="search-album justify-content-center mb-3">
                        <div className="form-group mt-3 text-center">
                            <input type="text" className="form-control" id="search-album" placeholder="Search albums..." value={albumName} onChange={updateAlbumToSearch} />
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    {/* When making call to Spotify API, if loading is true display 'Loading...', else display the results of the search */}
                    {
                        loading
                        ? <div className="row"><div className="col-md-12 text-center mt-3 mb-3"><p>Loading...</p></div></div>
                        : <div className="row justify-content-center">{searchedAlbums}</div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default SearchAlbums;