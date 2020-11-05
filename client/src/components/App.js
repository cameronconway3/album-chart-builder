import React, { useEffect } from 'react';
import { AlbumProvider} from './AlbumContext';

import axios from 'axios';
import qs from 'qs';

// App Components
import Header from './Header';
import SubmitAlbum from './SubmitAlbum';
import ListAlbums from './ListAlbums'

require('dotenv').config()

function App() {

    useEffect(() => {

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
                axios.get('https://api.spotify.com/v1/search?q=album:disintegration&type=album', headers)
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
       

    }, [])

    return (
        // All state from AlbumProvider is passed down throughout the application
        <AlbumProvider>
            <div className="container">
                <Header />
                <SubmitAlbum />
                <ListAlbums />
            </div>
        </AlbumProvider>
    );
}

export default App;
