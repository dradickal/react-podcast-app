import { useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import './SeriesList.css';

export default function SeriesList () {
    const seriesData = useLoaderData();

    const images = [];
    for (const series in seriesData) {
        const data = seriesData[series];
        images.push(<SeriesLink slug={series} imageURL={data.image} />)
    }
    
    useEffect(() => {
        console.log(seriesData);
    }, [])

    return (
        <>
            <article className='series-list'>
                {images}
            </article>
        </>
    )
};

function SeriesLink({ slug, imageURL }) {
    return (
        <Link to={ slug } key={ slug }>
            <img src={imageURL} /> 
        </Link>
    );
};
