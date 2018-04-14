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

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _dao3 = require('../restaurant/dao');

var _dao4 = _interopRequireDefault(_dao3);

var _dao5 = require('../table/dao');

var _dao6 = _interopRequireDefault(_dao5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    type TableSession {\n      id: ID!,\n      password: String,\n      numberOfPeople: Int,\n      openedAt: Date,\n      closedAt: Date,\n      payments: [Float],\n\n      table: Table,\n      restaurant: Restaurant,\n    }\n\n    input TableSessionInput {\n      tableId: ID!,\n      openedAt: Date!,\n      password: String,\n      numberOfPeople: Int,\n    }\n\n    input TableSessionPatchInput {\n      payments: [Float],\n      closedAt: Date,\n    }\n\n    extend type Query {\n      tableSession(id: ID!): TableSession\n    }\n\n    extend type Mutation {\n      createTableSession(input: TableSessionInput!): TableSession\n      updateTableSession(id: ID!, patch: TableSessionPatchInput!): Boolean\n    }\n  ',

  resolvers: {
    Query: {
      tableSession: function tableSession(_, _ref) {
        var id = _ref.id;
        return _dao2.default.findById(id);
      }
    },
    Mutation: {
      createTableSession: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, _ref3) {
          var input = _ref3.input;
          var table;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _dao6.default.findById(input.tableId);

                case 2:
                  table = _context.sent;

                  (0, _invariant2.default)(!!table, 'Entity.NOT_FOUND(Table)');
                  return _context.abrupt('return', _dao2.default.create((0, _extends3.default)({}, input, { restaurantId: table.restaurantId })));

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        return function createTableSession(_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }(),
      updateTableSession: function updateTableSession(_, _ref4) {
        var id = _ref4.id,
            patch = _ref4.patch;
        return _dao2.default.update(id, patch).then(function () {
          return true;
        });
      }
    },
    TableSession: {
      restaurant: function restaurant(_ref5) {
        var restaurantId = _ref5.restaurantId;
        return _dao4.default.findById(restaurantId);
      },
      table: function table(_ref6) {
        var tableId = _ref6.tableId;
        return _dao6.default.findById(tableId);
      }
    }
  }
};