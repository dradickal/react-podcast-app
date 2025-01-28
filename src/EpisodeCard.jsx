import { useState } from "react";
import {timeSincePublished} from "./util/dateComparison";
import { useEpisode } from "./EpisodeContext";
import icons from './util/iconsMapper';
import './EpisodeCard.css';


function timecodeFromSec(seconds)
{
    const sec = Math.round(seconds);
    const time =[ 
        Math.floor(sec / 3600),
        Math.floor(sec / 60) % 60,
        Math.floor(sec % 60),
    ];
    
    return time.map(v => v.toString().padStart(2, '0')).join(':');
}

export function EpisodeCard({episode, podcastImg, seriesTitle}) {
    const [listeningStatus, setListeningStatus] = useState(null);
    const [downloadStatus, setDownloadStatus] = useState('complete');
    const [queueStatus, setQueueStatus] = useState(null);
    const [ episodeMeta, setEpisodeMeta ] = useEpisode();
    const useEllipse = episode.brief.length > 485;

    let actionButtonClass = icons.actionButton[downloadStatus];
    let queueStatusClass = icons.queueStatus[queueStatus];
    let downloadStatusClass = icons.downloadStatus[downloadStatus];
    let listeningStatusClass = icons.listeningStatus[listeningStatus];

    const imageURL = episode.image || podcastImg;
    const contextData = {
        source: episode.audio.source,
        title: episode.title,
        series: seriesTitle,
        imageURL: imageURL,
    }

    if (queueStatus === 'current') {
        actionButtonClass = icons.actionButton[queueStatus];
    }

    const actionClick = (contextData) => {
        if (episodeMeta && contextData.source === episodeMeta.source) {
           return;
        }

        setEpisodeMeta(contextData);
    };

    return (
        <article className="episode-card">
            <div className="episode-header-title">
                <h1>{episode.title}</h1>
            </div>
            <div className="episode-header-right">
                <span className="episode-date">{timeSincePublished(episode.published)}</span>
                <i className="episode-menu fas fa-ellipsis-v"></i>
            </div>
            <div className="episode-image">
                <img src={imageURL} alt="Episode Graphic" />
            </div>
            <div className="episode-description">
                <p>{episode.brief} {useEllipse ? '\u2026' : ''}</p>
            </div>
            <div className="episode-action">
                <i className={actionButtonClass + ' episode-action-icon'} onClick={() => actionClick(contextData)}></i>
            </div>
            <div className="episode-footer">
                <span className="episode-footer-statusBar">
                    <i className={listeningStatusClass}></i>
                    <i className={downloadStatusClass}></i>
                    <i className={queueStatusClass}></i>
                </span>
                <span className="episode-footer-duration">{timecodeFromSec(episode.audio.length)}</span>
            </div>
        </article>
    )
}