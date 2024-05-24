import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { SeriesDescription } from "./SeriesDescription";
import { EpisodeCard } from "./EpisodeCard";

function EpisodeList() {
    const podcastData = useLoaderData();
    const { episodes } = podcastData;
    
    const EpisodeCards = [];
    episodes.forEach(episode => {
        EpisodeCards.push(<EpisodeCard episode={episode} key={episode.id} podcastImg={podcastData.image}/>);
        console.log(episode.brief.length);
    });

    return (
        <>
            {EpisodeCards}
        </>
    )
}

export default EpisodeList;