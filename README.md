# JSPM (SystemJS) Hot-Module-Reload
> Hot-Module-Reload made for dummies!

_Package for Node.js, written in TypeScript with async/await._
_Designed to use with JSPM or SystemJS._
_Using [SystemJS](https://github.com/systemjs/systemjs) for Universal (ES6) Module Loading Support._

### Quick Start for Dummies :)
```
$ npm install jspm-hmr --save-dev
$ ./node_modules/.bin/jspm-hmr --init
$ npm start
```
Now make some changes in "src/app.js" file and save it to see hot-module-reload in action!
You should use ES6 Modules (import/export) for future-proof code: http://exploringjs.com/es6/ch_modules.html

---

### Install

```
$ npm install jspm-hmr [--save-dev]
```
> Tip: You can install it globally using -g flag so you can use it as simple http server in any directory on your machine

> Pro-tip: You can use --init flag to initialize your project with index.html, app.js, server.js files - configured with hot-module-reload for JSPM & SystemJS

---

### Usage
```
$ jspm-hmr [path] [options]
```
 Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -I, --init              initialize your project with index.html, app.js, server.js files - configured with hot-module-reload for JSPM & SystemJS
    -O, --open              automatically open browser (defaults to false)
    -P, --port <number>     port number (defaults to 8888)
    -C, --caching [number]  enable caching with max-age= (defaults to -1)

### Examples:
- Initialize your project with hot-module-reload configuration in cwd
```
$ jspm-hmr -I
```

- Start dev server in CWD & open in last active browser window
```
$ jspm-hmr . -O
```

- Start dev server in "dist" sub-folder on port 4444 and caching set to 3600 sec
```
$ jspm-hmr "dist" -P 4444 -C 3600
```

---

### How it works
Watches specified files for changes in chosen path and emits events through web sockets on changes to your client to reload that particular JavaScript modules that has changed.
-I or --init flag initialize index.html and server.js in your project with automatic hot-module-reload configuration for easy setup.

Under the hood it uses great [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader) with [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter).

---

### Dependencies:
- [http-server](https://github.com/indexzero/http-server)
- [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter)
- [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader)

---

### License

Copyright 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
