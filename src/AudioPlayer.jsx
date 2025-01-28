import { createRef, useEffect } from 'react';
import { useEpisode } from './EpisodeContext';
import AudioPlayerH5, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function handleMediaReady(e, player) {
    console.log('Media is ready to play');
    console.log(e);
    console.log(player);
    player.current.playAudioPromise();
}

function EpisodeDisplay({ title, series, imageURL }) {
    return (
        <div className='episode-display'>
            {imageURL && <img src={imageURL} alt="Episode Graphic"/>}
            <div>
                <p className='episode-meta-title'>{title ?? "Select an Episode"}</p>
                <p className='episode-meta-series'>{series}</p>
            </div>
        </div>
    );
}

export function AudioPlayer() {
    const player = createRef();
    const [ episodeMeta ] = useEpisode();

    // TO-DO: rework layout of episode title and add image
    return (
        <>
            <AudioPlayerH5 
                src={episodeMeta?.source} 
                timeFormat='hh:mm:ss' 
                layout='horizontal'
                customProgressBarSection={[<EpisodeDisplay title={episodeMeta?.title} series={episodeMeta?.series} imageURL={episodeMeta?.imageURL}/>, RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION]}
                customAdditionalControls={[]}
                progressJumpSteps={ {forward: 10000, backward: 10000} }
                onCanPlay={(e) => handleMediaReady(e, player)}
                ref={player} 
            />
        </>
    )
}

