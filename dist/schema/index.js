'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _lodash = require('lodash');

var _graphqlTools = require('graphql-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SchemaDefinition = '\n  schema { query: Query, mutation: Mutation }\n  type Query\n  type Mutation\n';

var schema = _glob2.default.sync(__dirname + '/!(base)/graph.js').reduce(function (obj, file) {
  var _require$default = require(file).default,
      type = _require$default.type,
      resolvers = _require$default.resolvers;

  obj.typeDefs.push(type);
  (0, _lodash.merge)(obj.resolvers, resolvers);
  return obj;
}, { typeDefs: [SchemaDefinition], resolvers: {} });

exports.default = (0, _graphqlTools.makeExecutableSchema)(schema);