'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _dao3 = require('../restaurant/dao');

var _dao4 = _interopRequireDefault(_dao3);

var _dao5 = require('../item/dao');

var _dao6 = _interopRequireDefault(_dao5);

var _dao7 = require('../table/dao');

var _dao8 = _interopRequireDefault(_dao7);

var _dao9 = require('../table-session/dao');

var _dao10 = _interopRequireDefault(_dao9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    type Order {\n      id: ID!\n      details: String\n      status: OrderStatus\n\n      restaurant: Restaurant\n      table: Table\n      tableSession: TableSession\n      item: Item\n      aditionals: [Item]\n    }\n\n    input OrderInput {\n      tableSession: ID!\n      itemId: ID!\n      details: String\n      aditionals: [ID]\n    }\n\n    input OrderPatchInput {\n      itemId: ID!\n      details: String\n      aditionals: [ID]\n    }\n\n    extend type Query {\n      order(id: ID!): Order\n    }\n\n    extend type Mutation {\n      createOrder(input: OrderInput!): Order\n      updateOrder(id: ID!, patch: OrderPatchInput!): Boolean\n    }\n  ',

  resolvers: {
    Query: {
      order: function order(_, _ref) {
        var id = _ref.id;
        return _dao2.default.findById(id);
      }
    },
    Mutation: {
      createOrder: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref3) {
          var input = _ref3.input;

          var _ref4, restaurantId, tableId;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _dao10.default.findById(input.tableSession);

                case 2:
                  _ref4 = _context.sent;
                  restaurantId = _ref4.restaurantId;
                  tableId = _ref4.tableId;
                  return _context.abrupt('return', _dao2.default.create((0, _extends3.default)({}, input, { restaurantId: restaurantId, tableId: tableId })));

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function createOrder(_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }(),
      updateOrder: function updateOrder(_, _ref5) {
        var id = _ref5.id,
            patch = _ref5.patch;
        return _dao2.default.update(id, patch).then(function () {
          return true;
        });
      }
    },
    Order: {
      restaurant: function restaurant(_ref6) {
        var restaurantId = _ref6.restaurantId;
        return _dao4.default.findById(restaurantId);
      },
      table: function table(_ref7) {
        var tableId = _ref7.tableId;
        return _dao6.default.findById(tableId);
      },
      tableSession: function tableSession(_ref8) {
        var tableSessionId = _ref8.tableSessionId;
        return _dao10.default.findById(tableSessionId);
      },
      item: function item(_ref9) {
        var itemId = _ref9.itemId;
        return _dao6.default.findById(itemId);
      },
      aditionals: function aditionals(_ref10) {
        var _aditionals = _ref10.aditionals;
        return _dao6.default.find({ id: { $in: _aditionals } });
      }
    }
  }
};