import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export default function SeriesList () {
    const seriesData = useLoaderData();

    const images = [];
    for (const series in seriesData) {
        const data = seriesData[series];
        images.push(<img src={data.image} key={data.id}/>)
    }
    
    useEffect(() => {
        console.log(seriesData);
    }, [])

    return (
        <>
            <h1>SeriesList</h1>
            {images}
        </>
    )
};
