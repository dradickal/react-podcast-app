import { useEffect, useState } from "react";
import { Link, Outlet, useMatches } from 'react-router-dom';
import { SeriesHeader } from "./SeriesHeader";
import { AudioPlayer } from "./AudioPlayer";
import { EpisodeProvider } from "./EpisodeContext";
function PodcastApp() {
    return (
        <>
            <header>
                <div className="header-title">
                    <Link to={`${ROOT_PATH}/series`}><img src={`${IMAGE_PATH}/cassette-tape.svg`} alt="cassette tape logo" width="60px"/></Link>
                    <h1><Link to={`${ROOT_PATH}/series`}>RKC Cast</Link></h1>
                </div>
                <SeriesHeader />
            </header>
            <EpisodeProvider>
                <Outlet />
                <div className="player">
                    <AudioPlayer />
                </div>
            </EpisodeProvider>
        </>
    )
}

export default PodcastApp;