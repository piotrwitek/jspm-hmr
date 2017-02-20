## Dev-Server with Hot-Reload for JSPM & SystemJS
NodeJS/Express Server ehnanced with Chokidar WebSocket Server emitting events on file changes

**Npm package:**
- https://www.npmjs.com/package/jspm-hmr

**Project Starter using this Dev-Server (React / Redux / TypeScript / JSPM):**
- https://github.com/piotrwitek/react-redux-typescript-starter-kit

---

### Motivation
When starting development in JSPM / SystemJS Ecosystem you'll find out there is no standard dev-server, that could be equivalent in features to [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Although there are several projects such as jspm-server (a fork of live-server), these are not well-maintained and have missing or broken support for Hot-Reload and Live-Reload which is the main focus of this project.
Adding and configuring Hot-Reload manually is often hard and require advanced knowledge that not every developer needs to master in order to simply use the tool. 

For that reasons I have decided to create library that is providing the dev-server with hot-reload preconfigured with best-practices in mind, battle-tested in production and [open-source project](https://github.com/piotrwitek/react-redux-typescript-starter-kit) and extended with new [features](https://github.com/piotrwitek/jspm-hmr/pull/4) [requested by](https://github.com/piotrwitek/jspm-hmr/issues/8) [community](https://github.com/piotrwitek/jspm-hmr/issues/3).

### Features
- Configurable and feature-full web-server based on NodeJS/Express (built-in ssl, HTML5 history api fallback, proxy, cache, browser auto-start)
- Project initialization wizard - create new or update an exisintg project with preconfigured server and client scripts with battle-tested Hot-Reload setup, using [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader)
- `jspm-hmr` CLI utility to run a local web-server in any folder

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

Path: `(default: .)`

Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -I, --init                      run CLI Wizard to bootstrap your project
    -O, --open                      open default browser on server start
    --port <number>                 change default port number (default: 3000)
    --address <address>             change default address (default: localhost)
    --cache <seconds>               change default Cache-Control header max-age=<seconds> (default: -1)
    --proxy <address:port>          enable proxy of all requests to specified target
    --proxy-route <route_pattern>   change default route pattern to filter proxied requests (default: *)
    -S, --ssl                       enable https (by default will use built-in self-signed cert)
    --key <path>                    set path to ssl-key .pem file (will override built-in ssl-key)
    --cert <path>                   set path to ssl-cert .pem file (will override built-in ssl-cert)
    -F, --fallback [rewrite_target] enable HTML5 History Api Fallback (default: /index.html) [optional: change rewrite target]
    --disable-hmr                   disable Hot-Reload (Chokidar Socket Server)
    --verbose                       enable verbose logging for: fallback rewrites

---

### Programmatic Usage
https://github.com/piotrwitek/jspm-hmr/blob/master/boilerplate/server.js

---

### Examples:

- Start dev server in (by default) current directory with enabled HTML5 History Api Fallback (by default rewrite set to `/index.html`)
```
$ jspm-hmr --fallback
```

- Start dev server in current directory on port `4444` & open browser on server start (last active window takes precedence)
```
$ jspm-hmr . --port 4444 --open
```

- Start dev server in `dist` directory with enabled proxy and target set to "http://localhost:1234" and proxy route pattern set to `/api/`
```
$ jspm-hmr dist --proxy http://localhost:1234 --proxy-route /api/
```

- Start dev server in current directory with enabled https using built-in self-signed cert
```
$ jspm-hmr --ssl
```

- Start dev server in current directory with caching headers set to "3600 sec"
```
$ jspm-hmr --ssl --cache 3600
```

---

### How it works
Chokidar process on dev server watches specified path for file changes and emits events through web socket to the browser web socket client to reload that particular JavaScript module that has been changed.

Uses:
- [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader) for WebSocket Client
- [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter) for WebSocket Server

Peer Dependencies:
- [jspm](https://github.com/jspm/jspm-cli)
- [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader)

---

### License

MIT License

Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
