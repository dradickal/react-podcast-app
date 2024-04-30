async function getPodcastData(podcastId, sort, pageId) {
    let res = null;
    try {
        res = await fetch(`/api/podcasts/${podcastId}`);
    } catch (error) {
        throw Error(error.message);
    }

    return res.json()
}

export default getPodcastData;