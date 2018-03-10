import { reduce } from 'lodash';

const env = (key, miss) => process.env[key] || miss;
const reducer = (obj, miss, key) => ({ ...obj, [key]: env(key, miss) });

const config = reduce({
  PORT: 4000,
  SECRET_KEY: 'local-secret-key',
  BCRYPT_SALT_ROUNDS: 5,
}, reducer, {});

export default config;

