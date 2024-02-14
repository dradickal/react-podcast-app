export function SeriesDescription() {
    function toggleDescription(el) {
        const descID = el['aria-controls'];
        const descExpanded = el['aria-expanded'];
        const desc = document.getElementById(descID);

        descExpanded ? 'Collapse Description' : 'Expand Description';
        el['aria-expanded'] = !descExpanded;
    }
    return (
        <>
            <section className="header-series">
                <h1>The Most Interesting People</h1>
                <span className="series-description-button" role="button" tab-index="0" aria-expanded="true" aria-controls="series-description">
                    <i className="fas fa-info-circle"></i>
                </span>
                <div id="series-description">
                    <p>Listen to the most interesting people from around the world share thier stories in this podcast from RKC.</p>
                    <p className="credits"><b className="role">Host:</b> Jonathan Goldsmith</p>
                    <p className="credits"><b className="role">Produced by:</b> RKC</p>
                </div>
            </section>
        </>
    )
}