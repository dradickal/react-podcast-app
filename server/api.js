import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';
import { Client } from 'podcast-api';
import getPlaylist from './playlist.js';

const app = express();
const port = process.env.API_PORT;
const client = Client({ apiKey: process.env.LN_KEY });

app.use(pino());

app.get('/', (req, res) => {
    res.send('Hello World! Again.');
});

app.get('/rkc-pod-playlist', async (req, res, next) => {
    try {
        const response = await getPlaylist(client);
        res.json(response.data);
    }
    catch (error) {
        next(error);
    }
})

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.listen(port, () => {
    console.log(`Example app listening on  ${process.env.API_BASEURL}:${port}`);
});
