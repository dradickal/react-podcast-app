const SORT_ENUM = {
    newest: 'recent_first', 
    oldest: 'oldest_first',
};

export function getPodcast(client, id, orderBy, pageId) {
    const sortString = SORT_ENUM[orderBy] || SORT_ENUM['newest'];
    const next = pageId ? pageId : null;

    return client.fetchPodcastById({
        id: id,
        next_episode_pub_date: next,
        sort: sortString,
    });
};

export function reducePodcast(responseData) {
    return {
        id: responseData.id,
        title: responseData.title,
        episodes: responseData.episodes.reduce(episodeReducer, []),
    }
}

function episodeReducer(cleanedData, episode) {
    cleanedData = cleanedData || [];

    cleanedData.push({
        id: episode.id,
        title: episode.title,
        description: episode.description,
        image: episode.image,
        published: episode.pub_date_ms, 
        audio: {
            source: episode.audio,
            length: episode.audio_length_sec
        },
    });

    return cleanedData;
}

function constructPagination() {};