# JSPM Hot-Reload Server

> Hot-Reload made for dummies!

Node.js Package

Dependencies:
- http-server
- chokidar-socket-emitter

---
### Install

```
$ npm install jspm-hot-reload-server [--save-dev]
```
> Tip: You can install globally using -g flag

---
### Usage

```
$ jspm-hot-reload-server [path] [options]
```

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -O, --open              automatically open browser (defaults to false)
    -C, --caching [number]  enable caching with max-age= (defaults to -1)
    -P, --port <number>     port number (defaults to 8888)

### Examples

1. Start server in CWD & open in last active browser window
```
$ jspm-hot-reload-server . -O
```

2. Start server in "dist" sub-folder on port 4444 and caching set to 3600 sec
```
$ jspm-hot-reload-server "dist" --port 4444 -C 3600
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
