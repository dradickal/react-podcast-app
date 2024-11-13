import 'dotenv/config';
import express from 'express';
import cors from 'cors';
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


const originAllowlist = ['https://radickalcreations.com', 'https://www.radickalcreations.com'];
const corsOptionsDelegate = function (req, callback) {
    const reqOrigin = req.header('Origin');    
    const corsOptions = {
        origin: false,
    };

    if (originAllowlist.indexOf(reqOrigin) !== -1) {
        corsOptions.origin = reqOrigin;
    } 

    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

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

app.get('/podcasts/seriesData', (req, res, next) => {
    res.json(seriesData);
});

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: "Not Found"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on ${port}`);
});