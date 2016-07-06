# JSPM Hot-Reload Server
> Hot-Reload made for dummies!

Package for Node.js

### How it works
Watches specified files for changes in chosen path, sends events through web sockets to your client to reload only the JavaScript modules that has changed.
Uses [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader) on the client.

Dependencies:
- [http-server](https://github.com/indexzero/http-server)
- [chokidar-socket-emitter](https://github.com/capaj/chokidar-socket-emitter)
- [systemjs-hot-reloader](https://github.com/capaj/systemjs-hot-reloader)

---
### Install

```
$ npm install jspm-hot-reload-server [--save-dev]
```
> Tip: You can install globally using -g flag so you can use it outside project

> Pro-tip: You can run server with --init flag to initialize boilerplate index.html with hot-reload setup

---
### Usage

```
$ jspm-hot-reload-server [path] [options]
```

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -I, --init              initialize boilerplate index.html with client hot-reload setup
    -O, --open              automatically open browser (defaults to false)
    -C, --caching [number]  enable caching with max-age= (defaults to -1)
    -P, --port <number>     port number (defaults to 8888)

### Examples

- Start server in CWD & open in last active browser window
```
$ jspm-hot-reload-server . -O
```

- Start server in "dist" sub-folder on port 4444 and caching set to 3600 sec
```
$ jhrs "dist" --port 4444 -C 3600
```

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
