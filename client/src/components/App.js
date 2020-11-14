import React from 'react';
import { AlbumProvider} from './AlbumContext';

// App Components
import Chart from './Chart';
import SearchAlbums from './SearchAlbums';

function App() {

    return (
        // All state from AlbumProvider is passed down throughout the application
        <AlbumProvider>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-md-3">
                        <SearchAlbums />
                    </div>
                    <div className="col-md-9">
                        <Chart />
                    </div>
                </div>
            </div>
        </AlbumProvider>
    );
}

export default App;
