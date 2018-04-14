'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _dao3 = require('../restaurant/dao');

var _dao4 = _interopRequireDefault(_dao3);

var _dao5 = require('../table-session/dao');

var _dao6 = _interopRequireDefault(_dao5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    type Table {\n      id: ID!,\n      name: String,\n      slug: String,\n\n      restaurant: Restaurant,\n      openSessions: [TableSession],\n    }\n\n    input TableInput {\n      restaurantId: ID!,\n      name: String!,\n      slug: String!,\n    }\n\n    extend type Query {\n      table(id: ID!): Table\n    }\n\n    extend type Mutation {\n      createTable(input: TableInput!): Table\n    }\n  ',

  resolvers: {
    Query: {
      table: function table(_, _ref) {
        var id = _ref.id;
        return _dao2.default.findById(id);
      }
    },
    Mutation: {
      createTable: function createTable(_, _ref2) {
        var input = _ref2.input;
        return _dao2.default.create(input);
      }
    },
    Table: {
      restaurant: function restaurant(_ref3) {
        var restaurantId = _ref3.restaurantId;
        return _dao4.default.findById(restaurantId);
      },
      openSessions: function openSessions(_ref4) {
        var id = _ref4.id;
        return _dao6.default.find({
          tableId: id,
          closedAt: null
        });
      }
    }
  }
};