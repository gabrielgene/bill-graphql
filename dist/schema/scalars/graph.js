'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlDate = require('graphql-date');

var _graphqlDate2 = _interopRequireDefault(_graphqlDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    scalar Date\n  ',

  resolvers: { Date: _graphqlDate2.default }
};