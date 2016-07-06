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

module.exports = function(options) {
  // default setup
  const path = options.path || '.',
    // test this
    caching = options.caching && !isNaN(options.caching) ? options.caching : -1,
    hotReload = true,
    port = options.port || 8888;

  // create http-server
  const server = httpServer.createServer({
    root: path,
    cache: caching,
    robots: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });

  // inject chokidar-socket-emitter
  if (hotReload) {
    chokidar({
      app: server.server
    });
  }
  // start http-server
  server.listen(port);

  return server;
};
