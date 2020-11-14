import React, { useEffect} from 'react';

const DisplayedAlbum = props => {

    return (
        <div className="album-container">
            <img 
                data-id={props.data.albumId} 
                data-albumname={props.data.album} 
                data-artistsname={props.data.artists} 
                data-numofsongs={props.data.numOfSongs} 
                data-albumimage={props.data.albumImage}
                data-albumrating={props.data.albumRating}
                src={props.data.albumImage} className="card-img-top my-albums image-close" alt={`${props.data.album} - ${props.data.artists}`} 
            />
        </div>
    );
}

export default DisplayedAlbum;