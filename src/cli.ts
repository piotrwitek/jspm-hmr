#!/usr/bin/env node

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

import * as openerCommand from 'opener';
import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import * as jspmHmrServer from './jspm-hmr-server';
import { initProject } from './init';

import Config from './config';
const packageVersion = require('../package.json').version;
const packageDescription = require('../package.json').description;
const VERSION = require('../package.json').version;
const NODE_ENV = Config.NODE_ENV;

const commander = require('commander');
commander
  .version(packageVersion)
  .description(packageDescription + '\n  Version: ' + packageVersion)
  .usage('[path] [options]')
  .option('-i, --init', 'CLI Wizard to bootstrap your project')
  .option('-o, --open', 'open default browser on start (default: false)')
  .option('-p, --port <number>', 'port number (default: 3000)', parseInt)
  .option('-a, --address <address>', 'custom address (default: localhost)')
  .option('-c, --cache <seconds>', 'enable Cache-Control with max-age=<seconds> (default: -1)', parseInt)
  .option('-P, --proxy <address>:<port>', 'proxies requests to specified target')
  .option('--proxy-route <route_path>', 'proxies only requests that match route path (default: *)')
  .option('-S, --ssl', 'enables https (by default uses built-in self-signed cert)')
  .option('-K, --key <path>', 'path to ssl-key .pem file (overrides default key)')
  .option('-C, --cert <path>', 'path to ssl-cert .pem file (overrides default cert)')
  .option('-F, --fallback <rewrite_target>', 'enable HTML5 History Api Fallback (/index.html)')
  .option('--verbose', 'more logging messages for: fallback')
  .option('--disable-hmr', 'disable Hot-Reload (Chokidar Socket Server)')
  .parse(process.argv);

// main procedure
mainAsync();

async function mainAsync() {
  if (commander.init) {
    // INIT PROCEDURE
    await initProject();
  } else {
    // LAUNCH PROCEDURE
    logHeaderMessage();

    // create server options
    const OPEN = commander.open || false;
    const PORT = commander.port || Config.PORT;
    const ADDRESS = commander.address || Config.ADDRESS;
    const options = {
      path: commander.args[0] || '.',
      cache: commander.cache,
      proxy: commander.proxy,
      proxyRoute: commander.proxyRoute,
      ssl: commander.ssl,
      key: commander.key,
      cert: commander.cert,
      fallback: commander.fallback,
      disableHmr: commander.disableHmr,
      verbose: commander.verbose,
    };

    const protocol = options.ssl ? 'https' : 'http';
    const URL = protocol + '://' + ADDRESS + ':' + PORT;

    // SERVER
    const server = jspmHmrServer.createServer(options);

    server
      .listen(PORT, (err: Error) => {
        console.log(`listening at ${URL}`);
        console.log('[debug] %j', server.address());
        console.log('\n>>> hit CTRL-C twice to exit <<<\n');
      })
      .on('error', function (err: any) {
        if (err.code === 'EADDRINUSE') {
          console.log(`\n[WARNING] Selected address is in use: ${URL}`);
          console.log(`[WARNING] Please try again using different port or address...\n`);

          process.exit();
        }
      });

    // OPEN BROWSER
    if (OPEN) {
      openerCommand(URL, {
        command: undefined,
      });
    }
  }

  rl.close();
}

function logHeaderMessage() {
  console.log(`
  ###################################
  #  JSPM Hot-Module-Reload v${VERSION}  #
  ###################################
`);
  console.log(`environment ${NODE_ENV || 'development'}`);
}

// exit hooks
if (process.platform === 'win32') {
  rl.on('SIGINT', function () {
    process.emit('SIGINT');
  });
}
process.on('SIGINT', function () {
  console.log('\n\nhttp-server stopped!');
  process.exit();
});
process.on('SIGTERM', function () {
  console.log('\n\nhttp-server stopped!');
  process.exit();
});
