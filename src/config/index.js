import { reduce } from 'lodash';

const env = (key, miss) => process.env[key] || miss;
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  PORT: 4000,
  SECRET_KEY: 'local-secret-key',
  BCRYPT_SALT_ROUNDS: 5,
  MONGO_URL: 'mongodb://admin:bill!00@ds237989.mlab.com:37989/bill-dev',
}, reducer, {});

export default config;
