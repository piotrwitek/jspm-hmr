import * as http from 'http';
import * as httpProxy from 'http-proxy';
import * as supertest from 'supertest';
import { createServer } from '../src/jspm-hmr-server';

const TARGET_SERVER_PORT = 8080;
const PROXY_TARGET_ADDRESS = 'http://127.0.0.1:' + TARGET_SERVER_PORT;
const PROXY_SERVER_PORT = 3000;
const PROXY_SERVER_HOST = '127.0.0.1';

describe('testing jspmHmrServer features', () => {

  describe(`--proxy ${PROXY_TARGET_ADDRESS}`, () => {
    it('target server should receive request through proxy server', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: PROXY_TARGET_ADDRESS,
        disableHmr: true,
        verbose: true,
      }).listen(PROXY_SERVER_PORT);

      const targetServer = http.createServer(function a(req, res) {
        expect(req.headers.host).toEqual('127.0.0.1:3000');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_SERVER_PORT);

      http.request({
        host: PROXY_SERVER_HOST,
        port: PROXY_SERVER_PORT,
        path: '/',
        headers: { 'accept': '*/*' },
      }).end();
    });

    it('proxied request should preserve url params', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: PROXY_TARGET_ADDRESS,
        disableHmr: true,
        verbose: true,
      }).listen(PROXY_SERVER_PORT);

      const targetServer = http.createServer((req, res) => {
        expect(req.headers.host).toEqual('127.0.0.1:3000');
        expect(req.url).toEqual('/api/search?param=value');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_SERVER_PORT);

      http.request({
        host: PROXY_SERVER_HOST,
        port: PROXY_SERVER_PORT,
        path: '/api/search?param=value',
        headers: { 'accept': '*/*' },
      }).end();
    });
  });

  describe(`--proxy ${PROXY_TARGET_ADDRESS} --proxyRoute /api`, () => {
    it('should not proxy request if not contain "/api/" route', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: PROXY_TARGET_ADDRESS,
        proxyRoute: '/api',
        disableHmr: true,
        verbose: true,
      }).listen(PROXY_SERVER_PORT);

      const targetServer = http.createServer(function handler(req, res) {
        expect(handler).not.toHaveBeenCalled();
      }).listen(TARGET_SERVER_PORT);

      http.request({
        port: PROXY_SERVER_PORT,
        path: '/profile/',
        headers: { 'accept': '*/*' },
      }, (res) => {
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).end();
    });

    it('should proxy request if contain "/api" route', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: PROXY_TARGET_ADDRESS,
        proxyRoute: '/api',
        disableHmr: true,
        verbose: true,
      }).listen(PROXY_SERVER_PORT);

      const targetServer = http.createServer(function (req, res) {
        expect(req.headers.host).toEqual('127.0.0.1:3000');
        expect(req.url).toEqual('/api/users/2');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_SERVER_PORT);

      http.request({
        host: PROXY_SERVER_HOST,
        port: PROXY_SERVER_PORT,
        path: '/api/users/2',
        headers: { 'accept': '*/*' },
      }).end();
    });
  });

  describe(`--proxy ${PROXY_TARGET_ADDRESS} --proxyRoute /api --fallback `, () => {
    it('should proxy request even if fallback is enabled (proxy precenece over fallback)', (done) => {
      const proxyServer = createServer({
        path: './boilerplate/',
        proxy: PROXY_TARGET_ADDRESS,
        proxyRoute: '/api',
        fallback: true,
        disableHmr: true,
        verbose: true,
      }).listen(PROXY_SERVER_PORT);

      const targetServer = http.createServer(function handler(req, res) {
        expect(req.headers.host).toEqual('127.0.0.1:3000');
        expect(req.url).toEqual('/api/search?param=value');
        targetServer.close(() => { console.log('target closed'); });
        proxyServer.close(() => { console.log('proxy closed'); });
        done();
      }).listen(TARGET_SERVER_PORT);

      http.request({
        host: PROXY_SERVER_HOST,
        port: PROXY_SERVER_PORT,
        path: '/api/search?param=value',
        headers: { 'accept': '*/*' },
      }).end();
    });
  });

});
