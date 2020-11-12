import React, { useEffect, useContext, useState } from 'react';
import { AlbumContext } from './AlbumContext';

const Chart = () => {

    const {
        albums, 
        setAlbums,
    } = useContext(AlbumContext);

    const {
        albumsInChart, 
        setAlbumsInChart
    } = useContext(AlbumContext);
    const {
        albumsPerRow,
        setAlbumsPerRow,
    } = useContext(AlbumContext);

    useEffect(() => {

        const chartPos = document.querySelector(".chart");
        chartPos.innerHTML = ""

        const tableRows = albumsInChart/albumsPerRow;
    
        let chartTable = "";
    
        chartTable += "<tbody>";
        for(let i = 0; i < tableRows; i++) {
            chartTable += "<tr>";
            for(let j = 0; j < albumsPerRow; j++) {
                let code = `${i}${j}`;
                if(albums[parseInt(code)]) {
                    chartTable += `<td className='active' data-positionid=${parseInt(code)}>
                        <img
                            albumId="${albums[parseInt(code)].albumId}"
                            album="${albums[parseInt(code)].album}"
                            artists="${albums[parseInt(code)].artists}"
                            numOfSongs="${albums[parseInt(code)].numOfSongs}"
                            albumRating="${albums[parseInt(code)].albumRating}"
                            src="${albums[parseInt(code)].albumImage}"
                        />
                    </td>`;
                } else {
                    chartTable += `<td data-positionid=${parseInt(code)}>

                    </td>`;
                }
            }
            chartTable += "</tr>";
        }
        chartTable += "</tbody>";
    
        chartPos.insertAdjacentHTML("beforeend", chartTable)
    
    })
    
    return (
        <table className="chart border"></table>
    )
}

export default Chart;