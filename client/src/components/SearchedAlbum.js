import React from 'react';

const SearchedAlbum = props => {

    // Update the image with data related to the specific album
    return (
        <div className="p-1 searched-album">
            <img className="choose-album" 
                data-id={props.data.id} 
                data-albumname={props.data.name} 
                data-artistsname={props.data.artists[0].name} 
                data-numofsongs={props.data.total_tracks} 
                data-albumimage={props.data.images[1].url}
                src={props.data.images[1].url} 
            />
        </div>
    )
}

export default SearchedAlbum;