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
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: await getSeriesListData,
    id: "root",
    children: [
      { index: true, element: <Navigate to='/series' replace /> },
      {
        path: '/series',
        element: <SeriesList />,
      },
      { 
        path: '/series/:titleSlug',
        element: <EpisodeList />,
        loader: async ({ params }) => {
          const { titleSlug } = params;
          const data = await getSeriesListData();
          const podcastId = findSeriesID(data, titleSlug);
          
          return getPodcastData(podcastId); 
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
