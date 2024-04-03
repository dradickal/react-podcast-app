import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to='/series' replace /> },
      {
        path: '/series',
        loader: await fetchSeriesListData,
        element: <SeriesList />,
      },
      { 
        path: '/series/:title-slug',
        element: <EpisodeCard />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
