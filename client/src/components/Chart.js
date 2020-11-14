import React, { useEffect, useContext } from 'react';
import { AlbumContext } from './AlbumContext';
import ReactDOM from 'react-dom';

import DisplayedAlbum from './DisplayedAlbum';

const Chart = () => {

    const {
        albums,
        setAlbums,
    } = useContext(AlbumContext);

    const {
        chartSize
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

        // Get all the cells in the chart
        const myAlbums = document.querySelectorAll("td.album-space");
        for(let i = 0; i < myAlbums.length; i++) {

            // When the users mouse enters the specific cell, add an a remove icon overlay and change the opacity of the image
            myAlbums[i].addEventListener("mouseenter", () => {
                
                const cross = `
                    <svg className="close-icon" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                `;

                myAlbums[i].children[0].insertAdjacentHTML("beforeend", cross);
                myAlbums[i].children[0].children[0].style.opacity = "0.5"
            })

            // If the user clicks on the album remove it from the albums state array using 'filter' then update the albums state with the new filtered array
            myAlbums[i].addEventListener("click", () => {

                for(let j = 0; j < albums.length; j++) {
                    if(albums[j].albumId === myAlbums[i].children[0].children[0].dataset.id) {
                        const newAlbumState = albums.filter(album => album !== albums[i]);
                        setAlbums(newAlbumState);
                    }
                }

            })

            // When the users mouse leaves the specific cell add full opacity back and remove the remove icon
            myAlbums[i].addEventListener("mouseleave", () => {
                myAlbums[i].children[0].children[0].style.opacity = "1"
                myAlbums[i].children[0].removeChild(myAlbums[i].children[0].children[1])
            })
        }

    })

    // Function to create the chart, take rows and columns as a paremeter (currently only albums to choose are same row and height length, but this may be changed in the future)
    const createChart = (rows, columns) => {
        const chartPos = document.querySelector(".chart");
        chartPos.innerHTML = "";

        // Create the tbody and insert the rows
        let tableBody = document.createElement("tbody")
        for(let i = 0; i < rows; i++) {
            tableBody.insertRow();
        }

        let cellNumber = 0;

        // Loop over each row in tableBody
        for(let i = 0; i < tableBody.children.length; i++) {

            for(let j = 0; j < columns; j++) {
                // If the albums state contains an album at that cell number update the cell with the album
                if(albums[cellNumber]) {
                    const newCell = document.createElement("td");
                    newCell.setAttribute("class", "album-space")
                    ReactDOM.render(
                            <DisplayedAlbum data={albums[cellNumber]}/>, 
                        newCell);
                    tableBody.children[i].appendChild(newCell);
                // If there is no album corresponding to the cellNumber create an empty cell
                } else {
                    const newCell = document.createElement("td");
                    // newCell.innerHTML = `${cellNumber}`;
                    newCell.setAttribute("class", "empty-space")
                    tableBody.children[i].appendChild(newCell);
                }
                cellNumber++;
            }
        }

        // Insert the table body into the rendered table element
        chartPos.insertAdjacentElement("beforeend", tableBody);

    }
    
    return (
        <div className="row">
            <table className="chart border"></table>
        </div>
    )
}

export default Chart;