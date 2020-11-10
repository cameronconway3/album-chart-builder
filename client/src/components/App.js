import React, { useEffect } from 'react';
import { AlbumProvider} from './AlbumContext';

// App Components
import Header from './Header';
import SubmitAlbum from './SubmitAlbum';
import ListAlbums from './ListAlbums'
import SearchAlbums from './SearchAlbums';

function App() {

    return (
        // All state from AlbumProvider is passed down throughout the application
        <AlbumProvider>
            <div className="container border mt-4">
                <Header />
                <hr/>
                <SearchAlbums />
                {/* <SubmitAlbum /> */}
                <hr/>
                <ListAlbums />
            </div>
        </AlbumProvider>
    );
}

export default App;
