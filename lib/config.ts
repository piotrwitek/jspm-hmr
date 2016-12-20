import * as path from 'path';
const ROOT = path.join(__dirname, '..');

export const {
  WEB_PORT = 8888,
  NODE_ENV = 'development' as 'development' | 'stage' | 'production',
  CERT_PATH = path.join(ROOT, './ssl/cert.pem'),
  KEY_PATH = path.join(ROOT, './ssl/key.pem'),
} = process.env;
