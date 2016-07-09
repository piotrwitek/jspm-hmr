'use strict';
const httpServer = require('http-server');
const chokidar = require('chokidar-socket-emitter');
const openerCommand = require('opener');
const packageVersion = require('../package.json').version;
const nodeEnv = process.env.NODE_ENV;
function start(options) {
    const hotReload = true;
    const path = options.path || '.';
    const protocol = 'http';
    const host = 'localhost';
    const port = options.port || 8888;
    const url = protocol + '://' + host + ':' + port;
    const cache = options.caching || -1;
    const open = options.open || false;
    const command = options.command || null;
    const server = createServer(path, cache);
    logOptionsInfo(packageVersion, nodeEnv, cache);
    if (hotReload) {
        injectChokidarSocketEmitter(server);
    }
    server.listen(port);
    logStartedInfo(path, url);
    if (open) {
        openerCommand(url, {
            command: command
        });
    }
    return server;
}
exports.start = start;
function createServer(path, cache) {
    return httpServer.createServer({
        root: path,
        cache: cache,
        robots: true,
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
function logOptionsInfo(version, nodeEnv, cache) {
    const environmentText = (nodeEnv === 'production' ? 'production ' : 'development');
    const cacheText = (cache ? 'enabled ' : 'disabled');
    console.log('\n' +
        '  ###################################' + '\n' +
        '  #  JSPM Hot-Module-Reload v' + packageVersion + '  #' + '\n' +
        '  #----------------+----------------#' + '\n' +
        '  # environment    | ' + environmentText + '    #' + '\n' +
        '  # cache          | ' + cacheText + '       #' + '\n' +
        '  ###################################' + '\n');
}
function logStartedInfo(path, url) {
    console.log(`serving "${path}", listening at ${url}`);
    console.log('\n>>> hit CTRL-C to stop <<<\n');
}
//# sourceMappingURL=jspm-hmr-server.js.map