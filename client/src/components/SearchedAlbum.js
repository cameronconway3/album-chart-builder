import React, { useContext } from 'react';

const SearchedAlbum = props => {

    // Use album context
    // const [albums, setAlbums] = useContext(AlbumContext);

    return (
        
            <div className="col-md-2 text-center">
                <img className="choose-album border border-dark" width="150px" height="150px" 
                    data-id={props.data.id} 
                    data-albumname={props.data.name} 
                    data-artistsname={props.data.artists[0].name} 
                    data-numofsongs={props.data.total_tracks} 
                    src={props.data.images[1].url} 
                />
            </div>
        //     <p>{props.data.name} - {props.data.artists[0].name}</p>
    )
}

export default SearchedAlbum;