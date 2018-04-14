'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = function env(key, miss) {
  return process.env[key] || miss;
};
var reducer = function reducer(obj, miss, key) {
  return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, env(key, miss)));
};

var config = (0, _lodash.reduce)({
  PORT: 4000,
  SECRET_KEY: 'local-secret-key',
  BCRYPT_SALT_ROUNDS: 5,
  MONGO_URL: 'mongodb://admin:bill!00@ds237989.mlab.com:37989/bill-dev'
}, reducer, {});

exports.default = config;