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

const iconsMapper = {
    actionButton: actionButtonIcons,
    queueStatus: queueStatusIcons,
    downloadStatus: downloadStatusIcons,
    listeningStatus: listeningStatusIcons,
};

export default iconsMapper;