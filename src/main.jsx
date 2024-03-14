import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  json,
} from "react-router-dom";
import App from './App.jsx'
import SeriesList from './SeriesList.jsx';
import './main.css'

async function fetchSeriesListData () {
  const res = await fetch('/api/series/all');
  if(res.error) {
    console.log(error.message);
  }
  return res.json();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/series",
    loader: await fetchSeriesListData,
    element: <SeriesList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
