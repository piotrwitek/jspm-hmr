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
  chokidar = require('chokidar-socket-emitter'),
  packageJson = require('../package.json');

// default config setup
const defaultConfig = {
  baseUrl: '.',
  hotReload: true,
  caching: false,
  host: 'localhost',
  port: 8888
};
// createServer
const server = httpServer.createServer({
  root: defaultConfig.baseUrl,
  cache: defaultConfig.caching ? 3600 : -1,
  robots: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  }
});

// main
showInfoHeader();
// inject chokidar-socket-emitter
if (defaultConfig.hotReload) {
  chokidar({
    app: server.server
  });
}
// start server
server.listen(defaultConfig.port);
console.log('http-server started, serving "' + defaultConfig.baseUrl +
  '" at http://' + defaultConfig.host + ':' + defaultConfig.port);
console.log('hit CTRL-C to stop the server\n\n');

// logging helpers
function showInfoHeader() {
  const versionInfo = packageJson.version;
  const environmentInfo = (process.env.NODE_ENV === 'production' ? 'production ' : 'development');
  const cachingInfo = (defaultConfig.caching ? 'enabled ' : 'disabled');
  const hot_reloadInfo = (defaultConfig.hotReload ? 'enabled ' : 'disabled');

  console.log('\n' +
    '#################################' + '\n' +
    '#    JSPM Hot-Reload Server    ##' + '\n' +
    '#------------------------------##' + '\n' +
    '# version      | ' + versionInfo + '         ##' + '\n' +
    '# environment  | ' + environmentInfo + '   ##' + '\n' +
    '# caching      | ' + cachingInfo + '      ##' + '\n' +
    '# hot-reload   | ' + hot_reloadInfo + '      ##' + '\n' +
    '#################################' + '\n'
  );
}
