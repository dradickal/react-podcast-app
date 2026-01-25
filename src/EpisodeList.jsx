import { useLoaderData } from "react-router-dom";
import { EpisodeCard } from "./EpisodeCard";


function EpisodeList() {
    const podcastData = useLoaderData();
    const { episodes } = podcastData;
    
    const EpisodeCards = [];
    episodes.forEach(episode => {
        EpisodeCards.push(<EpisodeCard episode={episode} key={episode.id} podcastImg={podcastData.image} seriesTitle={podcastData.title}/>);
        console.log(episode.brief.length);
    });

    return (
        <>
            {EpisodeCards}
        </>
    )
}

export default EpisodeList;