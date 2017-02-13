## HTTP Dev-Server with Hot-Reload for JavaScript (ES6 Modules)

#### This library consist of:
#### - Express HTTP Server enhanced with WebSocket emitter on file changes
#### - SystemJS - ES6 Module Loader
#### - WebSocket receiver for browser that trigger Hot-Reload for changed ES6 Modules

- Npm package: https://www.npmjs.com/package/jspm-hmr
- ReactJS Boilerplate using this dev-server - https://github.com/piotrwitek/react-redux-typescript-starter-kit

---

### Features
- Quickly Bootstrap new Babel or TypeScript App using nice CLI Wizard - include Dev Server with Hot-Reload using SystemJS & JSPM
- Fast & Scalable Hot-Reload Capabilities (perfect for ReactJS, Angular2, Vue & more...)
- Live-reload static resources like styles (CSS, SCSS), images, fonts or HTML templates through [SystemJS Plugins Ecosystem](https://github.com/systemjs/systemjs#plugins)
- Leveraging [SystemJS](https://github.com/systemjs/systemjs) for Universal Module Loading Support

---

### Quick Start
Includes:
- Bootstrap Minimal App Boilerplate with fancy CLI Wizard
- Transpilation workflow setup to choose: Babel or TypeScript

> __Tip:__ Confirm all Wizard Questions with Enter for default __Babel__ setup

##### _ONE-LINE-COMMAND_
```
npm i jspm@beta jspm-hmr -D && ./node_modules/.bin/jspm init && ./node_modules/.bin/jspm i systemjs-hot-reloader && ./node_modules/.bin/jspm-hmr -I && npm start
```

Now you can open `app.js` or `es6module.js` file, make some changes and save it to see __Hot-Reload__ update running application without page refresh!

---

### Project setup

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

> __Tip:__ You can install it globally using -g flag so you can use it as simple http server in any directory on your machine

> __Pro-Tip:__ You can use --init flag to initialize your project with index.html, app.js, server.js files - configured with hot-module-reload out-of-the-box

---

### Usage
```
$ jspm-hmr [path] [options]
```
 Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -i, --init             CLI Wizard to bootstrap your project
    -o, --open             automatically open browser (default: false)
    -p, --port <number>    port number (default: 3000)
    -c, --cache <seconds>  enable Cache-Control with max-age=<seconds> (default: -1)
    -P, --proxy <url>      proxies requests to specified url    
    -S, --ssl              enables https (by default uses built-in self-signed cert)
    -K, --key <path>       path to ssl-key .pem file (overrides default key)
    -C, --cert <path>      path to ssl-cert .pem file (overrides default cert)
---

### Examples:

- Start dev server in PWD  on port "4444" & automatically open in browser (last active window takes precedence)
```
$ jspm-hmr . --port 4444 --open
```

- Start dev server in directory "dist" with caching set to "3600 sec" and proxy target set to "http://localhost:1234"
```
$ jspm-hmr dist  --cache 3600 --proxy http://localhost:1234
```

- Start dev server in directory "dist" with https using built-in self-signed cert
```
$ jspm-hmr dist --ssl
```

---

### How it works
Watches specified files for changes in chosen path and emits events through web sockets on changes to your client to reload that particular JavaScript modules that has changed.
`-i` or `--init` flag will run CLI Wizard to bootstrap your `index.html`, `app.js` and `server.js` in your project folder with Dev Server and Hot-Reload configuration for quick start.

It uses great [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader) for Client and [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter) for Dev Server.

---

### Dependencies:
- [http-server](https://github.com/indexzero/http-server)
- [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter)

### Peer Dependencies:
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
