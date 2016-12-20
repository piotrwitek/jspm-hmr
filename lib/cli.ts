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

'use strict';
import * as fs from 'fs';
import * as path from 'path';
import { mkdir } from 'shelljs';
import * as readline from 'readline';
import * as jspmHmrServer from './jspm-hmr-server';

const commander = require('commander');
const packageVersion = require('../package.json').version;
const packageDescription = require('../package.json').description;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

commander
  .version(packageVersion)
  .description(packageDescription + '\n  Version: ' + packageVersion)
  .usage('[path] [options]')
  .option('-i, --init', 'CLI Wizard to bootstrap your project')
  .option('-o, --open', 'automatically open browser (default: false)')
  .option('-p, --port <number>', 'port number (default: 8888)', parseInt)
  .option('-c, --cache <seconds>', 'enable Cache-Control with max-age=<seconds> (default: -1)', parseInt)
  .option('-P, --proxy <url>', 'proxies requests to specified url')
  .option('-S, --ssl', 'enable https on server, requires \'--key\' and \'--cert\'')
  .option('-K, --key <path>', 'path to ssl key')
  .option('-C, --cert <path>', 'path to ssl cert')
  .parse(process.argv);

// main procedure
main();

async function main() {
  if (commander.init) {
    // launch init
    await initProcedure();
    rl.close();
  } else {
    // launch server
    const options = {
      path: commander.args[0],
      cache: commander.cache,
      port: commander.port,
      open: commander.open,
      proxy: commander.proxy,
      ssl: commander.ssl,
      key: commander.key,
      cert: commander.cert
    };
    jspmHmrServer.start(options);
  }
}

async function initProcedure() {
  const targetRoot = process.cwd();
  const sourceRoot = path.join(__dirname, '../boilerplate');
  const clientFiles = ['index.html', 'assets/loader-style.css', 'src/app.js', 'src/es6module.js'];
  const serverFiles = ['server.js'];

  // confirm targetRoot folder
  console.log('  Initialization directory -> ' + targetRoot);
  const confirmed = await askConfirmationPromise('  - Is path correct?');

  if (!confirmed) {
    console.log('  Initialization aborted.');
    return;
  }

  // check files if exists the ask for confirmation to overwrite
  try {
    const files = [...clientFiles, ...serverFiles];
    for (let file of files) {
      const sourcePath = path.join(sourceRoot, file);
      const targetPath = path.join(targetRoot, file);
      if (await checkFileExistsConfirmOverwrite(targetPath)) {
        await copyFilePromise(sourcePath, targetPath);
      };
    }
    console.log('\n Boilerplate initialization completed.');
  } catch (err) {
    console.log('\n Boilerplate initialization failed with error:');
    console.log(err);
  }

}

async function checkFileExistsConfirmOverwrite(file: string) {
  const exist = await checkFileExistsPromise(file);

  if (exist) {
    console.log(`  File "${file}" already exists.`);
    const confirmed = await askConfirmationPromise('  - Overwrite?');

    if (!confirmed) {
      console.log('  Skipped');
      return false;
    }
  }

  return true;
}

function checkFileExistsPromise(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.access(file, fs.constants.W_OK, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

function askConfirmationPromise(msg: string) {
  return new Promise((resolve, reject) => {
    rl.question(msg + ' (Y)/n: ', (answer) => {
      const parsed = answer.toString().toLowerCase();
      if (parsed === 'y' || parsed === '') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function copyFilePromise(source: string, target: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, (err, data) => {
      if (err) reject(err);

      mkdir('-p', path.dirname(target));
      fs.writeFile(target, data, (err) => {
        if (err) reject(err);

        console.log('  - %s -> %s', source, target);
        resolve(true);
      });
    });
  });
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
