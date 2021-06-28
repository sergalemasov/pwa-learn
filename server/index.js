const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const { join } = require('path');
const {json} = require('body-parser');

const PORT = process.env.PORT || 5000;
const DIST_FOLDER = join(process.cwd(), 'public');

const app = express();

app.get('*.*', express.static(DIST_FOLDER));

app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
}));

app.use(createProxyMiddleware('/rabota', {
    target: 'https://rabota.tinkoff.ru/',
    changeOrigin: true,
    secure: true,
    pathRewrite: { '^/rabota' : '' }
}));

app.get('/feed', (_req, res) => {
    res.sendFile(join(DIST_FOLDER, 'index.html'));
});

app.get('/help', (_req, res) => {
    res.sendFile(join(DIST_FOLDER, 'help', 'index.html'));
});

app.post('/api', (req, res) => {
    console.log(req.body.foo);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});
