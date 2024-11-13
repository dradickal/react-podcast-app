import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { getSeriesListData, getPodcastData } from './util/DataUtility';
import App from './App.jsx';
import SeriesList from './SeriesList.jsx';
import './main.css';
import EpisodeList from './EpisodeList.jsx';

function findSeriesID(data, slug) {
  const series = data.find((obj) => obj['slug'] === slug);

  return series['id'];
}

/**  TO-DO 
 *    - Set up Handler for Episodes Routes with useRouteLoaderData
 *    - Modify Series Description to with useMatches and handler data
 *    - Create Episodes route loader with useRouteLoaderData
 *    - Build out EpisodesList compenent with API data
*/
const ROOT_PATH = '/demo/podcast-web-app'
const router = createBrowserRouter([
  {
    path: `${ROOT_PATH}`,
    element: <App />,
    loader: await getSeriesListData,
    id: "root",
    children: [
      { index: true, element: <Navigate to={`${ROOT_PATH}/series`} replace /> },
      {
        path: `${ROOT_PATH}/series`,
        element: <SeriesList />,
      },
      { 
        path: `${ROOT_PATH}/series/:titleSlug`,
        element: <EpisodeList />,
        loader: async ({ params }) => {
          const { titleSlug } = params;
          const data = await getSeriesListData();
          const podcastId = findSeriesID(data, titleSlug);
          
          return getPodcastData(podcastId); 
        },
        handle: {
          seriesData: (data) => {
            console.log('seriesData Prop', data);
            return { 
              get: (prop) => Object.hasOwn(data, prop) ? data[prop] : null, 
            }; 
          }
        }
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
