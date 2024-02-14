import captureKeyboardEvent from "./util/captureKeyboardEvent";

export function SeriesDescription() {
    function toggleDescription(e) {
        e.preventDefault();
        const el = e.currentTarget;
        const descID = el.attributes.getNamedItem('aria-controls').value;
        const descExpanded = el.ariaExpanded === "true";
        const desc = document.getElementById(descID);
        const hide = () => { desc.classList.add('hide'); desc.ariaHidden = true; }
        const show = () => { desc.classList.remove('hide'); desc.ariaHidden = false; }
        
        descExpanded ? hide() : show();
        el.ariaExpanded = !descExpanded;
    }
    
    function keyboardTrigger(e) {
        if(captureKeyboardEvent(e.nativeEvent, "Enter", " ")) {
            toggleDescription(e);
        }

        return true;
    }

    return (
        <>
            <section className="header-series">
                <h1>The Most Interesting People</h1>
                <span className="series-description-button" 
                    role="button" 
                    onClick={toggleDescription}
                    onKeyDown={keyboardTrigger} 
                    tabIndex="0" 
                    aria-expanded="true" 
                    aria-controls="series-description"
                    aria-label="Toggle Series Description">
                    <i className="fas fa-info-circle"></i>
                </span>
                <div id="series-description" className="series-description">
                    <p>Listen to the most interesting people from around the world share thier stories in this podcast from RKC.</p>
                    <p className="credits"><b className="role">Host:</b> Jonathan Goldsmith</p>
                    <p className="credits"><b className="role">Produced by:</b> RKC</p>
                </div>
            </section>
        </>
    )
}