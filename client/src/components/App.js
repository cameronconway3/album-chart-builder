import React from 'react';
import { AlbumProvider} from './AlbumContext';

// App Components
import Header from './Header';
import SubmitAlbum from './SubmitAlbum';
import ListAlbums from './ListAlbums'

function App() {

    

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
