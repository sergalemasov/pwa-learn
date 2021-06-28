const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const { join } = require('path');

const PORT = process.env.PORT || 5000;
const DIST_FOLDER = join(process.cwd(), 'public');

const app = express();

app.get('*.*', express.static(DIST_FOLDER));

app.use(createProxyMiddleware('/rabota', {
    target: 'https://rabota.tinkoff.ru/',
    changeOrigin: true,
    secure: true,
    pathRewrite: { '^/rabota' : '' }
}));

app.get('/', (_req, res) => {
    res.sendFile(join(DIST_FOLDER, 'index.html'));
});

app.get('/help', (_req, res) => {
    res.sendFile(join(DIST_FOLDER, 'help', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});
