function getPodcastData(podcastId, sort, pageId) {
    let res = null;
    try {
        res = fetch(`/api/podcasts/${podcastId}`);
    } catch (error) {
        throw Error(error.message);
    }

    return res;
}

export default getPodcastData;