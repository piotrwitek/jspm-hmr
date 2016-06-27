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
const httpServer = require('http-server'),
  chokidar = require('chokidar-socket-emitter');

exports = function(options) {
  // default config setup
  const config = {
    baseUrl: options.path || '.',
    hotReload: true,
    caching: false,
    host: options.host || 'localhost',
    port: options.port || 8888
  };
  // createServer
  const server = httpServer.createServer({
    root: config.baseUrl,
    cache: config.caching ? 3600 : -1,
    robots: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });

  // main

  // inject chokidar-socket-emitter
  if (config.hotReload) {
    chokidar({
      app: server.server
    });
  }
  // start server
  server.listen(config.port);
}
