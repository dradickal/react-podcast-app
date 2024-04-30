import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { SeriesDescription } from "./SeriesDescription";
import { EpisodeCard } from "./EpisodeCard";

function EpisodeList() {
    const podcastData = useLoaderData();
    const { episodes } = podcastData;
    
    const EpisodeCards = [];
    episodes.forEach(episode => {
        EpisodeCards.push(<EpisodeCard episode={episode} key={episode.id}/>);
    });

    return (
        <>
            {EpisodeCards}
        </>
    )
}

export default EpisodeList;