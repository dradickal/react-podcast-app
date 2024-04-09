export function getPlaylist(client) {
    return client.fetchPlaylistById({
        id: 'RZumaH2P1U5',
        type: 'podcast_list',
        last_timestamp_ms: 0,
        sort: 'recent_added_first',
    });
}

/** TO-DO
 *   - Clean up descriptions from API. Split into array by <p>. 
 *   - Append my custom data for credits, and Easter Egg.
 */
export function reducePlaylist(responseData) {
    const { items } = responseData;

    return items.reduce((cleanedData, item) => {
        const { data } = item;
        cleanedData.push({
            id: data.id,
            slug: sluggify(data.title),
            title: data.title,
            description: data.description,
            image: data.image,
            publisher: data.publisher,
        });

        return cleanedData;
    },[]);
}

function sluggify(s) {
    const cleaned = s.replace(/[^\w\s]/gi, '');
    const lowered = cleaned.toLowerCase();
    const words = lowered.split(' ');

    return words.join('-');
}