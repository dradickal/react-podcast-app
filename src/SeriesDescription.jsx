import captureKeyboardEvent from './util/captureKeyboardEvent';
import './SeriesDescription.css';

export function SeriesDescription() {
    function toggleDescription(e) {
        e.preventDefault();
        const el = e.currentTarget;
        const descID = el.attributes.getNamedItem('aria-controls').value;
        const descExpanded = el.ariaExpanded === 'true';
        const desc = document.getElementById(descID);
        const hide = () => { desc.classList.add('hide'); desc.ariaHidden = true; }
        const show = () => { desc.classList.remove('hide'); desc.ariaHidden = false; }
        
        descExpanded ? hide() : show();
        el.ariaExpanded = !descExpanded;
    }
    
    function keyboardTrigger(e) {
        if(captureKeyboardEvent(e.nativeEvent, 'Enter', ' ')) {
            toggleDescription(e);
        }

        return true;
    }

    return (
        <>
            <section className="header-series">
                <h1>The Most Interesting People</h1>
                <span 
                    className="series-description-button" 
                    role="button" 
                    onClick={toggleDescription}
                    onKeyDown={keyboardTrigger} 
                    tabIndex="0" 
                    aria-expanded="false" 
                    aria-controls="series-description"
                    aria-label="Toggle view of series description">
                    <i className="fas fa-info-circle"></i>
                </span>
                <div id="series-description" className="series-description hide" aria-hidden="true">
                    <p>Listen to the most interesting people from around the world share thier stories in this podcast from RKC.</p>
                    <p className="credits"><b className="role">Host:</b> Jonathan Goldsmith</p>
                    <p className="credits"><b className="role">Produced by:</b> RKC</p>
                </div>
            </section>
        </>
    )
}