#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const jspmHmrServer = require('./jspm-hmr-server');
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
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (program.init) {
            yield initProcedure();
            rl.close();
        }
        else {
            jspmHmrServer.start(options);
        }
    });
}
function initProcedure() {
    return __awaiter(this, void 0, void 0, function* () {
        const indexFiles = ['index.html', 'loader-style.css', 'app.js'];
        const serverFiles = ['server.js'];
        let confirmedFiles = [];
        try {
            for (let file of indexFiles) {
                if (yield checkFileExistsConfirmOverwrite(file)) {
                    confirmedFiles.push(file);
                }
                ;
            }
            for (let file of serverFiles) {
                if (yield checkFileExistsConfirmOverwrite(file)) {
                    confirmedFiles.push(file);
                }
                ;
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function checkFileExistsConfirmOverwrite(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield checkFileExists(file);
        if (exist) {
            console.log(`File "${file}" already exists.`);
            const confirmed = yield askConfirmOverwrite();
            if (confirmed) {
                console.info('  Overwritten');
            }
            else {
                console.log('  Skipped');
                return false;
            }
        }
        return true;
    });
}
function checkFileExists(file) {
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
            }
            else {
                resolve(true);
            }
        });
    });
}
function processFile(fileName, done) {
    const source = path.join(__dirname, '/../', fileName);
    const target = path.join(process.cwd(), path.sep, fileName);
    done();
}
function processFileFinally(err) {
    if (err) {
        console.log('\n Boilerplate initialization failed.');
    }
    else {
        console.log('\n  Boilerplate initialization completed in current directory.');
    }
}
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
//# sourceMappingURL=cli.js.map