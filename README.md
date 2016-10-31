## HOT-RELOAD & DEV-SERVER for Vanilla JavaScript (ES6 Modules)
> ### _Framework Agnostic Hot-Reload - powered by SystemJS & JSPM_
> You don't need fancy frameworks (like ReactJS) to do Hot-Reload! Check yourself!

_Node.js package (written in TypeScript):_ https://www.npmjs.com/package/jspm-hmr

---

### _CRAZY-ONE-LINER_ for Quick Start :)
- Rapid bootstrapping a new Vanilla JavaScript Application
- Choose transpilation using Babel or TypeScript

_Confirm all Wizard Questions with Enter - for default Babel setup_

```
npm i jspm@beta jspm-hmr -D && ./node_modules/.bin/jspm init && ./node_modules/.bin/jspm i systemjs-hot-reloader && ./node_modules/.bin/jspm-hmr -I && npm start
```

Now go and make some changes in `app.js` or `es6module.js` file and save it to see __Vanilla JavaScript Hot-Reload__ in action!

_Always use ES6 Modules Standard (import/export) instead of CommonJS/AMD format for solid static analysis capabilities and compliance with JS standard:_ http://exploringjs.com/es6/ch_modules.html

---

### Features
- Quickly Bootstrap new Babel or TypeScript App using Cool CLI Wizard - include Dev Server with Hot-Reload using SystemJS & JSPM
- Fast & Scalable Hot-Reload Capabilities (perfect for ReactJS, Angular2, Vue & more...)
- ReactJS Example workflow(https://github.com/piotrwitek/react-redux-typescript-starter-kit)
- Live-reload resources like styles (CSS, SCSS), static assets or HTML files through System.js plugins
- Leveraging [SystemJS](https://github.com/systemjs/systemjs) for Universal Module Loading Support

---

### Prerequisites

`npm i jspm@beta -D` - installs http://jspm.io
`./node_modules/.bin/jspm init` - initialize jspm wizard
`./node_modules/.bin/jspm i systemjs-hot-reloader` - installs client "Hot-Reload" dependency

### Install

```
$ npm i jspm-hmr -D
```

> __Tip:__ You can install it globally using -g flag so you can use it as simple http server in any directory on your machine

> __Pro-Tip:__ You can use --init flag to initialize your project with index.html, app.js, server.js files - configured with hot-module-reload for JSPM & SystemJS

---

### Usage
```
$ jspm-hmr [path] [options]
```
 Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -i, --init             CLI Wizard to bootstrap your project
    -o, --open             automatically open browser (default: false)
    -p, --port <number>    port number (default: 8888)
    -c, --cache <seconds>  enable Cache-Control with max-age=<seconds> (default: -1)
    -P, --proxy <url>      proxies requests to specified url

---

### Examples:

- Start dev server in PWD  on port "4444" & automatically open in browser (last active window takes precedence)
```
$ jspm-hmr . -p 4444 -o
```

- Start dev server in directory "dist"  with caching set to "3600 sec" and proxy target set to "http://localhost:1234"
```
$ jspm-hmr dist  -c 3600 -P http://localhost:1234
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
