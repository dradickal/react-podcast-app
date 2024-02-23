export default (client) => {
    return client.fetchPlaylistById({
        id: 'RZumaH2P1U5',
        type: 'podcast_list',
        last_timestamp_ms: 0,
        sort: 'recent_added_first',
    });
}
