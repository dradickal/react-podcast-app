function getPodcastData(podcastId, sort, pageId) {
    let res = null;
    try {
        res = fetch(`${BASE_API}/podcasts/${podcastId}`);
    } catch (error) {
        throw Error(error.message);
    }

    return res;
}

export default getPodcastData;