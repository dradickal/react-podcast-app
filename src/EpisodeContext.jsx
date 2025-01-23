import { createContext, useContext, useState } from "react";

const EpisodeContext = createContext();

export function EpisodeProvider({ children }) {
    const [ episodeMeta, setEpisodeMeta ] = useState(null);

    return (
        <EpisodeContext.Provider value={[ episodeMeta, setEpisodeMeta ]}>
            {children}
        </EpisodeContext.Provider>
    );
}

export function useEpisode() {
    return useContext(EpisodeContext);
}

