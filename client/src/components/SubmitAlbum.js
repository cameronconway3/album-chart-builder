import React, { useState, useContext } from 'react';
import { AlbumContext } from './AlbumContext';
// import { useForm } from "react-hook-form";

const SubmitAlbum = () => {

    // Input States
    const [albumName, setAlbumName] = useState('');
    const [artistsName, setArtistsName] = useState('');
    const [numOfSongs, setNumOfSongs] = useState('');

    // Use album context
    const [albums, setAlbums] = useContext(AlbumContext);

    // const { register, handleSubmit, watch, errors } = useForm();

    // Update stateful values
    const updateAlbumName = e => {
        setAlbumName(e.target.value);
    }
    const updateArtistsName = e => {
        setArtistsName(e.target.value);
    }
    const updateNumOfSongs = e => {
        let value = e.target.value;
        setNumOfSongs(value);
        
        const songFormField = document.querySelector('.song-form');

        if(value.match(/^[0-9]*$/) && value !== '0' && value.length !== 0 && value <= 30) {
            songFormField.insertAdjacentHTML('beforeend', createSongFields(value));
        } else {
            songFormField.innerHTML = "";
        }
    }

    const createSongFields = numOfSongs => {
        let songsHTML = '';
        for(let i = 0; i < numOfSongs; i++) {
            songsHTML += `
                <div class="col-md-6 borderR">
                    <label>song ${i+1}</label>
                    <br>
                    <select class="song-input">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            `;
        };
        return songsHTML;
    }


    const addAlbum = e => {
        e.preventDefault();

        let totalScore = 0;
        const songRatings = document.querySelectorAll('.song-input')
        for(let i = 0; i < songRatings.length; i++) {
            totalScore += parseInt(songRatings[i].value)
        }

        let albumRatingRaw = totalScore/songRatings.length;
        let albumRating = (Math.round(albumRatingRaw * 10) / 10).toFixed(1);

        let newAlbum = {
            album: albumName,
            artists: artistsName,
            numOfSongs: numOfSongs
        }

        setAlbums(prevAlbums => [...prevAlbums, newAlbum])
        
        const albumForm = document.querySelector('form');
        albumForm.reset();
        const songFormField = document.querySelector('.song-form');
        songFormField.innerHTML = "";
    }

    return (
        <div className="row album-form">
            <div className="col-md-12">
                <form onSubmit={addAlbum}>
                    <input type="text" name="albumName" placeholder="album name" value={albumName} onChange={updateAlbumName} />
                    <input type="text" name="artistsName" placeholder="artist(s) name" value={artistsName} onChange={updateArtistsName} />
                    <input type="text" name="numofSongs" placeholder="number of songs" value={numOfSongs} onChange={updateNumOfSongs} />
                    <button>Submit</button>
                    <div className="song-form"></div>
                </form>
            </div>
        </div>
    )
}

export default SubmitAlbum;