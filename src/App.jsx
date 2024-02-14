import { useState } from "react";
import { SeriesDescription } from "./SeriesDescription";
import { EpisodeCard } from "./EpisodeCard";

function PodcastApp() {
    return (
        <>
            <div className="header">
                <h1>RKC Cast</h1>
                <SeriesDescription />
            </div>
            <EpisodeCard />
            <div className="player">
                <p>Application Player</p>
            </div>
        </>
    )
}

export default PodcastApp;