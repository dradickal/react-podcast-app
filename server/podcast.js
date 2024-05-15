import { NodeHtmlMarkdown } from "node-html-markdown";
import { parse } from 'node-html-parser';

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
        image: responseData.image,
        episodes: responseData.episodes.reduce(episodeReducer, []),
    }
}

function parseHtmlToMarkdown(description) {
    return NodeHtmlMarkdown.translate(description, { maxConsecutiveNewlines: 2 })
}

function parseHtmlToString(description) {
    let s = null;
    const root = parse(description);

    s = root.text.replaceAll(/\n/gi, ' ');
    if (s.length > 500) {
        s = s.slice(0, 500);
        const lastChar = s.at(-1);

        if (/[^\s,.!\?]/.test(lastChar)) {
           s = s.slice(0,s.lastIndexOf(' '));
        }
    }
    return s;
}

function episodeReducer(cleanedData, episode) {
    cleanedData = cleanedData || [];

    cleanedData.push({
        id: episode.id,
        title: episode.title,
        description: parseHtmlToMarkdown(episode.description),
        brief: parseHtmlToString(episode.description),
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