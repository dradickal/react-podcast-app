function AudioPlayer(audio) {
    const {source, length} = audio;
    return (
        <audio controls controlsList="noFullscreen nodownload" preload="metadata" crossOrigin="anonymous">
            <source src={source} type="audio/mp3" />
        </audio>
    )
}