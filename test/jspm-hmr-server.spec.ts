import * as http from 'http';
import * as httpProxy from 'http-proxy';
import * as supertest from 'supertest';
import { createServer } from '../src/jspm-hmr-server';

const TARGET_PORT = 8080;
const TARGET_ADDRESS = 'http://127.0.0.1:' + TARGET_PORT;
const SERVER_PORT = 3000;
const SERVER_ADDRESS = 'http://127.0.0.1:' + SERVER_PORT;
const PROXY_ROUTE = '*';

describe('testing jspmHmrServer features', () => {

  describe('--proxy ' + TARGET_ADDRESS, () => {

    const proxyServer = createServer({
      path: './boilerplate/',
      proxy: TARGET_ADDRESS,
      fallback: undefined,
      disableHmr: true,
      verbose: true,
    });
    proxyServer.listen(SERVER_PORT);

    test('target server should receive request through proxy server', (done) => {
      const targetServer = http.createServer(function (req, res) {
        expect(req.headers.host).toEqual('127.0.0.1:3000');
        targetServer.close();
        done();
      }).listen(TARGET_PORT);;

      http.request(SERVER_ADDRESS, function () { /* */ }).end();
    })

    test('proxied request should preserve url params', (done) => {
      const targetServer = http.createServer(function (req, res) {
        expect(req.url).toEqual('/?parameter=test');
        targetServer.close();
        done();
      }).listen(TARGET_PORT);

      http.request(SERVER_ADDRESS + '/?parameter=test', function () { /* */ }).end();
    });

  });

});
