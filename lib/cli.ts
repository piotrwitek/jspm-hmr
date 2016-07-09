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
import * as readline from 'readline';
import * as jspmHmrServer from './jspm-hmr-server';

const program = require('commander');
const packageVersion = require('../package.json').version;
const packageDescription = require('../package.json').description;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

program
  .version(packageVersion)
  .description(packageDescription + '\n  Version: ' + packageVersion)
  .usage('[path] [options]')
  .option('-I, --init', 'initialize your project with index.html, app.js, server.js files - configured with hot-module-reload for JSPM & SystemJS')
  .option('-O, --open', 'automatically open browser (defaults to false)')
  .option('-P, --port <number>', 'port number (defaults to 8888)', parseInt)
  .option('-C, --cache [number]', 'enable Cache-Control with max-age=number (defaults to -1)', parseInt)
  .parse(process.argv);

const options = {
  path: program.args[0],
  cache: program.cache,
  port: program.port,
  open: program.open
};

// main procedure
main();

async function main() {
  if (program.init) {
    // launch init
    await initProcedure();
    rl.close();
  } else {
    // launch server
    jspmHmrServer.start(options);
  }
}

async function initProcedure() {
  const indexFiles = ['index.html', 'loader-style.css', 'src/app.js'];
  const serverFiles = ['server.js'];
  let confirmedFiles = [];

  // ask to confirm cwd TODO

  // check files if exists the ask for confirmation to overwrite
  try {
    // ask to init index TODO
    for (let file of indexFiles) {
      const targetPath = path.join(process.cwd(), path.sep, file);
      if (await checkFileExistsConfirmOverwrite(targetPath)) {
        confirmedFiles.push(targetPath);
      };
    }
    // ask to init server TODO
    for (let file of serverFiles) {
      const targetPath = path.join(process.cwd(), path.sep, file);
      if (await checkFileExistsConfirmOverwrite(targetPath)) {
        confirmedFiles.push(targetPath);
      };
    }
  } catch (err) {
    console.log(err);
  }

  // process index files
  // process server files
  // process finally
}

async function checkFileExistsConfirmOverwrite(file) {
  const exist = await checkFileExists(file);

  if (exist) {
    console.log(`File "${file}" already exists.`);
    const confirmed = await askConfirmOverwrite();

    if (confirmed) {
      console.info('  Overwritten');
    } else {
      console.log('  Skipped');

      return false;
    }
  }

  return true;
}

function checkFileExists(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.access(file, fs.W_OK, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

function askConfirmOverwrite() {
  return new Promise((resolve, reject) => {
    rl.question('  Overwrite? [yes]/no: ', (answer) => {
      if (answer === 'no') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function processFile(fileName, done) {
  const source = path.join(__dirname, '/../', fileName);
  const target = path.join(process.cwd(), path.sep, fileName);

  // logic TODO

  done();
}

function processFileFinally(err) {
  if (err) {
    console.log('\n Boilerplate initialization failed.');
  } else {
    console.log('\n  Boilerplate initialization completed in current directory.');
  }
}

// exit hooks
if (process.platform === 'win32') {
  rl.on('SIGINT', function() {
    process.emit('SIGINT');
  });
}
process.on('SIGINT', function() {
  console.log('\n\nhttp-server stopped!');
  process.exit();
});
process.on('SIGTERM', function() {
  console.log('\n\nhttp-server stopped!');
  process.exit();
});
