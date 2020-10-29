import React, { useEffect } from 'react';
import { AlbumProvider} from './AlbumContext';

import axios from 'axios';
import qs from 'qs';

// App Components
import Header from './Header';
import SubmitAlbum from './SubmitAlbum';
import ListAlbums from './ListAlbums'

function App() {

    useEffect(() => {
       
        const access_token = process.env.REACT_APP_ACCESS_TOKEN;

        const headers = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        }

        axios.get('https://api.spotify.com/v1/search?q=album:disintegration&type=album', headers)
            .then(response => console.log(response.data))

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
