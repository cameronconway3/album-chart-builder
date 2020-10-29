import React from 'react';

const Album = (props) => {
    return (
        <div className="col-md-3">
            <p>{props.album}</p>
            <p>{props.artists}</p>
            <p>{props.numOfSongs}</p>
        </div>
    );
}

export default Album;