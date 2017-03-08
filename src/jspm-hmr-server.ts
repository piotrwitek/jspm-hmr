import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as httpProxy from 'http-proxy';
import * as express from 'express';
import * as compress from 'compression';
import * as historyApiFallback from 'connect-history-api-fallback';
import * as chokidar from 'chokidar-socket-emitter';

import Config from './config';

// TYPES
export type JspmHmrServer = http.Server | https.Server;

export type ServerOptions = {
  path?: string,
  cache?: number,
  proxy?: string,
  proxyRoute?: string,
  ssl?: boolean,
  key?: string,
  cert?: string,
  fallback?: boolean,
  disableHmr?: boolean,
  verbose?: boolean,
};

// API
/**
 * server factory funciton
 * @export
 * @param {Options} options
 * @returns
 */
export function createServer(options: ServerOptions): JspmHmrServer {

  // APP
  const app = express();

  // Apply gzip compression
  app.use(compress());

  // TODO: CORS
  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  // };

  // Proxy
  if (options.proxy) {
    const proxyTarget = options.proxy;
    const proxyRoute = options.proxyRoute || '*';

    const proxy = httpProxy.createProxyServer();
    app.use(proxyRoute, (req, res) => {
      req.url = req.baseUrl;
      proxy.web(req, res, { target: proxyTarget });
      proxy.on('error', (err: Error) => {
        console.log('Proxy Server Error: ', err.message);
      });
    });
  }

  // Apply routing rewrites to serve /index.html for SPA Applications

  if (options.fallback) {
    const fallback = options.fallback === true ? '/index.html' : options.fallback;
    console.log('history api fallback active', fallback);

    app.use(historyApiFallback({
      index: fallback, verbose: !!options.verbose,
    }));
  }


  // Static files & Cache
  const staticRoot = options.path || '.';
  const cache = options.cache * 1000 || -1;

  console.log(`static files served from ${path.resolve(staticRoot)}`);
  app.use(express.static(staticRoot, { maxAge: cache }));

  // Server Instance
  let serverInstance;

  if (options.ssl) {
    const key = options.key || Config.KEY_PATH;
    const cert = options.cert || Config.CERT_PATH;

    const sslOptions = (key && cert) && {
      key: fs.readFileSync(key),
      cert: fs.readFileSync(cert),
    };

    serverInstance = https.createServer(sslOptions, app);
  } else {
    serverInstance = http.createServer(app);
  }

  // Chokidar Socket.io Server
  if (!options.disableHmr) {
    const chokidarOptions = {
      ...{ quiet: false, path: options.path },
      app: serverInstance,
    };

    chokidar(chokidarOptions);
  }

  return serverInstance;
}
