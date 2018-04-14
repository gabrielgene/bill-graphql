'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _apolloServerExpress = require('apollo-server-express');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _db = require('./db');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _db.connectDB)();

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

app.get('/', function (_, res) {
  return res.send('Hello World');
});
app.use('/graphql', (0, _apolloServerExpress.graphqlExpress)({ schema: _schema2.default }));
app.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

app.listen(_config2.default.PORT || 4000);
console.warn('Running a GraphQL API server at localhost:' + _config2.default.PORT + '/graphql');