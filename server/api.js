import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import { Client } from 'podcast-api';
import { getPlaylist, reducePlaylist } from './playlist.js';
import { getPodcast, reducePodcast } from './podcast.js';
import seriesData from './seriesData.js';

export const app = express();
let port = process.env.API_PORT;
const client = Client({ apiKey: process.env.LN_KEY });

if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
    port = "passenger";
}

app.use(pino());

app.get('/', (req, res) => {
    res.send('Hello World! Again.');
});

app.get('/podcasts/raw/all', async (req, res, next) => {
    try {
        const response = await getPlaylist(client);
        res.json(response.data);
    }
    catch (error) {
        next(error);
    }
});

app.get('/podcasts/all', async (req, res, next) => {
    try {
        const response = await getPlaylist(client);
        const playlist = response.data;
        res.json(reducePlaylist(playlist));
    }
    catch (error) {
        next(error);
    }
});

app.get('/podcasts/raw/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await getPodcast(client, id);
        res.json(response.data);
    }
    catch (error) {
        next(error);
    }
});

app.get('/podcasts/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await getPodcast(client, id);
        const series = response.data;
        res.json(reducePodcast(series));
    }
    catch (error) {
        next(error);
    }
});

app.get('/seriesData', (req, res, next) => {
    res.json(seriesData);
});

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});