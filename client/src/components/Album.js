import React from 'react';

const Album = props => {
    return (
        <div className="col-md-2 text-center">
            <img 
                data-id={props.albumId} 
                data-albumname={props.album} 
                data-artistsname={props.artists} 
                data-numofsongs={props.numOfSongs} 
                data-albumimage={props.albumImage}
                data-albumrating={props.albumRating}
                src={props.albumImage} class="card-img-top my-albums" alt={`${props.album} - ${props.artists}`} 
            />
        </div>
    );
}

export default Album;