import React, { useState, useContext, useEffect } from 'react';
import { AlbumContext } from './AlbumContext';

// Album Component
import Album from './Album';
import Chart from './Chart';

const DisplayAlbums = () => {

    return (
        <div className="row">
            <Chart />
        </div>

    )
}

export default DisplayAlbums;