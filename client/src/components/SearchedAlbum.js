import React, { useContext } from 'react';

const SearchedAlbum = props => {

    // Use album context
    // const [albums, setAlbums] = useContext(AlbumContext);

    return (
        
            <div className="col-md-2 text-center p-1">
                <img className="choose-album" width="110px" height="110px" 
                    data-id={props.data.id} 
                    data-albumname={props.data.name} 
                    data-artistsname={props.data.artists[0].name} 
                    data-numofsongs={props.data.total_tracks} 
                    data-albumimage={props.data.images[1].url}
                    src={props.data.images[1].url} 
                />
            </div>
        //     <p>{props.data.name} - {props.data.artists[0].name}</p>
    )
}

export default SearchedAlbum;