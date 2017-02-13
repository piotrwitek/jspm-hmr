import * as path from 'path';
const ROOT = path.join(__dirname, '..');

namespace Config {
  export const {
    ADDRESS = 'localhost',
    PORT = 3000,
    NODE_ENV = 'development' as 'development' | 'stage' | 'production',
    CERT_PATH = path.join(ROOT, './ssl/cert.pem'),
    KEY_PATH = path.join(ROOT, './ssl/key.pem'),
  } = process.env;
}

export default Config;
