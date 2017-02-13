## HTTP Dev-Server with Hot-Reload for JavaScript (ES6 Modules)

#### Express Server ehnanced with Chokidar WebSocket Server emitting events on file changes

- Npm package: https://www.npmjs.com/package/jspm-hmr
- ReactJS Boilerplate using this dev-server - https://github.com/piotrwitek/react-redux-typescript-starter-kit

---

### Features
- Fast Hot-Reload - using [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader)
- Live-reload static files (e.g. styles (CSS/SCSS), images, fonts or HTML templates) through [SystemJS Plugins Ecosystem](https://github.com/systemjs/systemjs#plugins)
- Universal Module Loading with [SystemJS](https://github.com/systemjs/systemjs)
- Initialize minimal App with Babel or TypeScript transpilation workflow using CLI Wizard (including Hot-Reload configuration)

---

### Quick Start
- Bootstrap Minimal App Boilerplate guided by CLI Wizard
- Transpilation workflow setup: choose Babel or TypeScript

> __Tip:__ Confirm all Wizard Questions with Enter for default __Babel__ setup

##### _ONE-LINER_
```
npm i jspm@beta jspm-hmr -D && ./node_modules/.bin/jspm init && ./node_modules/.bin/jspm i systemjs-hot-reloader && ./node_modules/.bin/jspm-hmr -I && npm start
```

Now open `app.js` or `es6module.js` file from `src`, make some changes and save to see __Hot-Reload__ updates in running application without page reload!

---

### Project prerequisite

- http://jspm.io - package manager and bundler for JS apps (webpack alternative)  
`npm i jspm@beta -D`
- use jspm-cli to init project build workflow  
`./node_modules/.bin/jspm init`
- install client web-socket receiver for hot-reload  
`./node_modules/.bin/jspm i systemjs-hot-reloader`

### Install

```
$ npm i jspm-hmr -D
```

> __Tip:__ You can install this module globally using -g flag and use it as a simple static http server in any folder on your machine

> __Pro-Tip:__ You can use --init flag to initialize your project with index.html, app.js, server.js files - configured with hot-module-reload out-of-the-box

---

### Usage
```
$ jspm-hmr [path] [options]
```
 Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -i, --init                      CLI Wizard to bootstrap your project
    -o, --open                      automatically open browser (default: false)
    -p, --port <number>             port number (default: 3000)
    -a, --address <address>         custom address (default: localhost)
    -c, --cache <seconds>           enable Cache-Control with max-age=<seconds> (default: -1)
    -P, --proxy <address>:<port>    proxies requests to specified target
    --proxy-route <route_path>      proxies only requests that match route path (default: *)
    -S, --ssl                       enables https (by default uses built-in self-signed cert)
    -K, --key <path>                path to ssl-key .pem file (overrides default key)
    -C, --cert <path>               path to ssl-cert .pem file (overrides default cert)
    -F, --fallback <rewrite_target> enable HTML5 History Api Fallback (/index.html)
    --verbose                       more logging messages for: fallback
    --disable-hmr                   disable Hot-Reload (Chokidar Socket Server)
---

### Examples:

- Start dev server in `pwd` on port "4444" & automatically open in browser (last active window takes precedence)
```
$ jspm-hmr . --port 4444 --open
```

- Start dev server in directory "dist" with caching set to "3600 sec" and proxy target set to "http://localhost:1234" with proxy route pattern equal to `/api/`
```
$ jspm-hmr dist  --cache 3600 --proxy http://localhost:1234 --proxy-route /api/
```

- Start dev server in directory "dist" with https using built-in self-signed cert
```
$ jspm-hmr dist --ssl
```

- Start dev server in `pwd` with HTML5 History Api Fallback
```
$ jspm-hmr --fallback 
```

---

### How it works
Chokidar process on dev server watches specified path for file changes and emits events through web socket to the browser web socket client to reload that particular JavaScript module that has been changed.

Uses:
- [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader) for WebSocket Client
- [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter) for WebSocket Server

### Mandatory Peer Dependencies:
- [jspm](https://github.com/jspm/jspm-cli)
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
