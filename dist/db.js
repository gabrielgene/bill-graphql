'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var connectDB = exports.connectDB = function connectDB() {
  _mongoose2.default.connect(_config2.default.MONGO_URL, function (err) {
    return err ? console.error('Mongo error: ' + err) : console.warn('Mongo connected');
  });
};