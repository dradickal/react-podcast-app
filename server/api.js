import 'dotenv/config';
import express from 'express';
import pino from 'pino-http';


const app = express();
const port = process.env.API_PORT;

app.use(pino());

app.get('/', (req, res) => {
    res.send('Hello World! Again.');
});

app.all('*', (req, res) => {
    res.sendStatus(404);
})

app.listen(port, () => {
    console.log(`Example app listening on  ${process.env.API_BASEURL}:${port}`);
});
