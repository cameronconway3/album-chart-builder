import React, { useEffect } from 'react';
import { AlbumProvider} from './AlbumContext';

// App Components
import Header from './Header';
import SearchAlbums from './SearchAlbums';
import DisplayAlbums from './DisplayAlbums';

function App() {

    return (
        // All state from AlbumProvider is passed down throughout the application
        <AlbumProvider>
            <div className="container-fluid">
                <div className="row">
                    <Header />
                </div>
                <hr/>
                <SearchAlbums />
                <DisplayAlbums />
            </div>
        </AlbumProvider>
    );
}

export default App;
