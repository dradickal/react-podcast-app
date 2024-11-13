let seriesListRes = null;

async function getSeriesListData() {
    const res = await fetchSeriesAll();

    return res.clone().json();
};

function fetchSeriesAll () {
    if (seriesListRes) {
        return seriesListRes;
    }

    seriesListRes = fetch(`${BASE_API}/podcasts/all`)
        .then((res) => {
            if (res.error) {
                throw Error(error.message);
            }
            return res;
        });

    return seriesListRes;
};

export default getSeriesListData;