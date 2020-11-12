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
                <div className="row">
                    <div className="col-md-3 border border-dark">
                        <SearchAlbums />
                    </div>
                    <div className="col-md-9 border border-dark">
                        <DisplayAlbums />
                    </div>
                </div>
            </div>
        </AlbumProvider>
    );
}

export default App;
