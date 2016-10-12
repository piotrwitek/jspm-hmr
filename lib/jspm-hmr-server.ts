/*
 *   Copyright 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
'use strict';
// TODO: switch to core http module
// TODO: extract as seperate node package
const httpServer = require('http-server');
const chokidar = require('chokidar-socket-emitter');
const openerCommand = require('opener');
const packageVersion = require('../package.json').version;
const nodeEnv = process.env.NODE_ENV;

export function start(options) {
  // init
  const hotReload = true;
  const path = options.path || '.';
  const protocol = 'http';
  const host = 'localhost';
  const port = options.port || 8888;
  const url = protocol + '://' + host + ':' + port;
  const cache = options.caching || -1;
  const open = options.open || false;
  const command = options.command || null;
  const server = createServer(path, cache, options.proxy);

  logOptionsInfo(packageVersion, nodeEnv, cache);

  // inject hmr & start server
  if (hotReload) {
    injectChokidarSocketEmitter(server);
  }
  server.listen(port);

  logStartedInfo(path, url);

  // open browser
  if (open) {
    openerCommand(url, {
      command: command
    });
  }

  return server;
}

function createServer(path, cache, proxy) {
  return httpServer.createServer({
    root: path,
    cache: cache,
    robots: true,
    proxy: proxy,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
}

function injectChokidarSocketEmitter(server) {
  chokidar({
    app: server.server
  });
}

// log helpers
function logOptionsInfo(version, nodeEnv, cache) {
  const environmentText = (nodeEnv === 'production' ? 'production ' : 'development');
  const cacheText = (cache ? 'enabled ' : 'disabled');

  console.log('\n' +
    '  ###################################' + '\n' +
    '  #  JSPM Hot-Module-Reload v' + packageVersion + '  #' + '\n' +
    '  #----------------+----------------#' + '\n' +
    '  # environment    | ' + environmentText + '    #' + '\n' +
    '  # cache          | ' + cacheText + '       #' + '\n' +
    '  ###################################' + '\n'
  );
}

function logStartedInfo(path, url) {
  console.log(`serving "${path}", listening at ${url}`);
  console.log('\n>>> hit CTRL-C to stop <<<\n');
}
