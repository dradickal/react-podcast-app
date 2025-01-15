import { useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import './SeriesList.css';

export default function SeriesList () {
    const seriesData = useLoaderData();

    const images = [];
    seriesData.forEach(series => {
        images.push(<SeriesLink slug={series.slug} imageURL={series.image} key={series.slug}/>);
    });
    
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
        <Link to={slug}>
            <img src={imageURL} /> 
        </Link>
    );
};
