import { useEffect, useState } from "react";
import { Outlet, useMatches } from 'react-router-dom';
import { SeriesHeader } from "./SeriesHeader";

function PodcastApp() {
    const matches = useMatches();

    // useEffect(() => {
    //     console.log(matches);
    // }, []);

    return (
        <>
            <div className="header">
                <h1>RKC Cast</h1>
                <SeriesHeader />
            </div>
            <Outlet />
            <div className="player">
                <p>Application Player</p>
            </div>
        </>
    )
}

export default PodcastApp;