const express = require('express');
const next = require('next');
const { join } = require('path');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const dir = './dist/apps/web'; // path to your Next.js app
const app = next({ dev, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(dir, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
