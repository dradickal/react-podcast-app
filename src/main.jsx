import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useRouteLoaderData,
} from 'react-router-dom';
import App from './App.jsx';
import SeriesList from './SeriesList.jsx';
import './main.css';
import { EpisodeCard } from './EpisodeCard.jsx';

async function fetchSeriesListData () {
  const res = await fetch('/api/series/all');
  if(res.error) {
    console.log(error.message);
  }
  return res.json();
}

async function fetchEpisodeList (id) {
  console.log(id);
  return id;
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
    loader: await fetchSeriesListData,
    id: "root",
    children: [
      { index: true, element: <Navigate to='/series' replace /> },
      {
        path: '/series',
        element: <SeriesList />,
      },
      { 
        path: '/series/:titleSlug',
        element: <EpisodeCard />,
        loader: async ({ params }) => {
          const { titleSlug } = params;

          return fetchEpisodeList(titleSlug); 
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
