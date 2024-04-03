import { useEffect, useState } from "react";
import { Outlet, useMatches } from 'react-router-dom';
import { SeriesDescription } from "./SeriesDescription";
import { EpisodeCard } from "./EpisodeCard";

function PodcastApp() {
    const matches = useMatches();

    useEffect(() => {
        console.log(matches);
    }, []);
    
    return (
        <>
            <div className="header">
                <h1>RKC Cast</h1>
                <HeaderDescription />
            </div>
            <Outlet />
            <div className="player">
                <p>Application Player</p>
            </div>
        </>
    )
}

function HeaderDescription() {
    return <SeriesDescription />
}

export default PodcastApp;