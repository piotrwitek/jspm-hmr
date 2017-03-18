import * as http from 'http';
import * as httpProxy from 'http-proxy';
import * as supertest from 'supertest';
import { createServer } from '../src/jspm-hmr-server';

const TARGET_PORT = 8080;
const TARGET_ADDRESS = 'http://127.0.0.1:' + TARGET_PORT;
const SERVER_PORT = 3000;
const SERVER_ADDRESS = 'http://127.0.0.1:' + SERVER_PORT;

describe('testing jspmHmrServer features', () => {

  describe(`--proxy ${TARGET_ADDRESS}`, () => {
    it('target server should receive request through proxy server', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: TARGET_ADDRESS,
        disableHmr: true,
        verbose: true,
      }).listen(SERVER_PORT);

      const targetServer = http.createServer(function a(req, res) {
        expect(req.headers.host).toEqual('127.0.0.1:3000');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_PORT);

      http.request(`${SERVER_ADDRESS}/`).end();
    });

    it('proxied request should preserve url params', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: TARGET_ADDRESS,
        disableHmr: true,
        verbose: true,
      }).listen(SERVER_PORT);

      const targetServer = http.createServer((req, res) => {
        expect(req.url).toEqual('/?parameter=test');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_PORT);

      http.request(`${SERVER_ADDRESS}/?parameter=test`).end();
    });
  });

  describe(`--proxy ${TARGET_ADDRESS} --proxyRoute /api`, () => {
    it('should not receive request if not contain "/api" route', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: TARGET_ADDRESS,
        proxyRoute: '/api',
        disableHmr: true,
        verbose: true,
      }).listen(SERVER_PORT);

      const targetServer = http.createServer(function handler(req, res) {
        expect(handler).not.toHaveBeenCalled();
      }).listen(TARGET_PORT);

      http.request(`${SERVER_ADDRESS}/`, (res) => {
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).end();
    });

    it('should reveive request for "/api" route', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: TARGET_ADDRESS,
        proxyRoute: '/api',
        disableHmr: true,
        verbose: true,
      }).listen(SERVER_PORT);

      const targetServer = http.createServer(function (req, res) {
        expect(req.url).toEqual('/api/');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_PORT);

      http.request(`${SERVER_ADDRESS}/api`).end();
    });
  });

});
