import { useMatches } from "react-router-dom";
import { SeriesDescription } from "./SeriesDescription";

export function SeriesHeader() {
    const matches = useMatches();
    const currentRoute = matches.at(-1);
    const seriesData = currentRoute.handle?.seriesData(currentRoute.data);

    return (
        <section className="header-series">
            {seriesData
                ? <SeriesDescription title={seriesData.get('title')} description={seriesData.get('description')} />
                : '' 
            }
        </section>
    );
};
