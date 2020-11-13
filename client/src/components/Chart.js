import React, { useEffect, useContext, useState } from 'react';
import { AlbumContext } from './AlbumContext';
import ReactDOM from 'react-dom';

import DisplayedAlbum from './DisplayedAlbum';

const Chart = () => {

    const {
        albums, 
        setAlbums,
    } = useContext(AlbumContext);

    const {
        chartSize, 
        setChartSize
    } = useContext(AlbumContext);


    useEffect(() => {
        // Different Chart Sizes 
        //3x3
        if(chartSize === "3x3") {
            createChart(3, 3);
        }

        //4x4
        if(chartSize === "4x4") {
            createChart(4, 4);
        }

        //5x5
        if(chartSize === "5x5") {
            createChart(5, 5);
        }

        //6x6
        if(chartSize === "6x6") {
            createChart(6, 6);
        }
    })

    const createChart = (rows, columns) => {
        const chartPos = document.querySelector(".chart");
        chartPos.innerHTML = "";

        let tableBody = document.createElement("tbody")
        for(let i = 0; i < rows; i++) {
            tableBody.insertRow();
        }

        let cellNumber = 0;

        for(let i = 0; i < tableBody.children.length; i++) {

            for(let j = 0; j < columns; j++) {
                if(albums[cellNumber]) {
                    const newCell = document.createElement("td");
                    ReactDOM.render(
                            <DisplayedAlbum data={albums[cellNumber]}/>, 
                        newCell);
                    tableBody.children[i].appendChild(newCell);
                } else {
                    const newCell = document.createElement("td");
                    // newCell.innerHTML = `${cellNumber}`;
                    newCell.setAttribute("class", "empty-space")
                    tableBody.children[i].appendChild(newCell);
                }
                cellNumber++;
            }
        }

        chartPos.insertAdjacentElement("beforeend", tableBody);

    }
    
    return (
        <table className="chart border"></table>
    )
}

export default Chart;