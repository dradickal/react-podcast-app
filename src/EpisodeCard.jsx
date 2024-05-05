import { useState } from "react";
import {timeSincePublished} from "./util/dateComparison";

const actionButtonIcons = {
    'null': 'far fa-arrow-to-bottom',
    'inProgress': 'far fa-times',
    'complete': 'fas fa-play',
    'current': 'fas fa-play',
    'nowPlaying': 'fas fa-pause',
};
    
const queueStatusIcons = {
    'null': '',
    'inQueue': 'fas fa-list',
    'current': 'fas fa-play',
};
    
const downloadStatusIcons = {
    'null': '',
    'inProgress': '',
    'complete': 'fas fa-arrow-alt-to-bottom'
};
    
const listeningStatusIcons = {
    'null': 'fas fa-certificate',
    'nowPlaying': 'fas fa-volume',
    'inProgress': 'fas fa-volume-off',
    'complete': 'far fa-check',
};

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

export function EpisodeCard({episode}) {
    const [listeningStatus, setListeningStatus] = useState(null);
    const [downloadStatus, setDownloadStatus] = useState(null);
    const [queueStatus, setQueueStatus] = useState(null);

    let actionButtonClass = actionButtonIcons[downloadStatus];
    let queueStatusClass = queueStatusIcons[queueStatus];
    let downloadStatusClass = downloadStatusIcons[downloadStatus];
    let listeningStatusClass = listeningStatusIcons[listeningStatus];

    if (queueStatus === 'current') {
        actionButtonClass = actionButtonIcons[queueStatus];
    }

    const actionClick = () => {
        switch(downloadStatus) {
        case null: 
            setDownloadStatus('inProgress');
            break;
        case 'inProgress':
            setDownloadStatus('complete');
            break;
        case 'complete':
            setDownloadStatus('nowPlaying');
            break;
        default:
            setDownloadStatus(null);
        }
    }

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
                <img src={episode.image} alt="Episode Graphic" />
            </div>
            <div className="episode-description">
                <p>We had a great conversation with Jon Hamm. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt purus eu mauris gravida, id porta lacus semper. Sed vitae tortor sit amet odio posuere maximus eget at tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per.</p>
            </div>
            <div className="episode-action">
                <i className={actionButtonClass + ' episode-action-icon'} onClick={actionClick}></i>
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