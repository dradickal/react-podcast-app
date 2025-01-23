import { createRef, useEffect } from 'react';
import { useEpisode } from './EpisodeContext';
import AudioPlayerH5 from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function handleMediaReady(e, player) {
    console.log('Media is ready to play');
    console.log(e);
    console.log(player);
    player.current.playAudioPromise();
}

export function AudioPlayer() {
    const player = createRef();
    const [ episodeMeta ] = useEpisode();


    return (
        <>
            <span>{episodeMeta ? `${episodeMeta.series} | ${episodeMeta.title}`: "Select an Episode to Play"}</span>
            <AudioPlayerH5 
                src={episodeMeta?.source} 
                timeFormat='hh:mm:ss' 
                layout='horizontal'
                progressJumpSteps={ {forward: 10000, backward: 10000} }
                onCanPlay={(e) => handleMediaReady(e, player)}
                ref={player} 
            />
        </>
    )
}
