import React from 'react';

const Album = props => {
    return (
        <div className="p-1 displayed-album">
            <img 
                data-id={props.albumId} 
                data-albumname={props.album} 
                data-artistsname={props.artists} 
                data-numofsongs={props.numOfSongs} 
                data-albumimage={props.albumImage}
                data-albumrating={props.albumRating}
                src={props.albumImage} className="card-img-top my-albums" alt={`${props.album} - ${props.artists}`} 
            />
        </div>
    );
}

export default Album;