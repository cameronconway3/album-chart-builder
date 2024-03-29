import React, { useContext, useEffect } from 'react';
import { AlbumContext } from './AlbumContext';

import domtoimage from 'dom-to-image';

const Header = () => {

    const {
        setChartSize
    } = useContext(AlbumContext);

    useEffect(() => {
        // Update the chart size with the related option
        const chartChoices = document.querySelectorAll(".chart-size");
        for(let i = 0; i < chartChoices.length; i++) {
            chartChoices[i].addEventListener("click", () => {
                setChartSize(chartChoices[i].innerHTML);
            })
        }

        // Add ability to download the chart as a JPEG using 'domtoimage' package
        const downloadAlbum = document.querySelector(".download-chart");
        
        downloadAlbum.addEventListener("click", () => {
            const chart = document.querySelector(".chart");

            domtoimage.toJpeg(chart, { quality: 0.95 })
                .then( dataUrl => {
                    const link = document.createElement('a');
                    link.download = 'album-chart.jpeg';
                    link.href = dataUrl;
                    link.click();
                });
        })
    })

    return (
        <React.Fragment>
            <div className="col-md-12">
                <ul className="nav justify-content-center header">
                    <li className="nav-item">
                        <a className="nav-link active p-3 m-2 chart-size" href="#">3x3</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active p-3 m-2 chart-size" href="#">4x4</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active p-3 m-2 chart-size" href="#">5x5</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active p-3 m-2 chart-size" href="#">6x6</a>
                    </li>
                </ul>
            </div>

            <div className="col-md-12 text-center">
                <button className="btn download-chart mb-2">Download</button>
            </div>
        </React.Fragment>

    )
}

export default Header;