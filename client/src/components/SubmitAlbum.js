import React from 'react';

const SubmitAlbum = () => {

    return (
        <form>
            <input type="text" name="albumName" placeholder="album name" />
            <input type="text" name="artistName" placeholder="artist(s) name" />
            <input type="text" name="numofSongs" placeholder="number of songs" />
        </form>
    )
}

export default SubmitAlbum;