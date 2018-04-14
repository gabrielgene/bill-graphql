'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dao = require('../base/dao');

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableSessionDAO = function (_BaseDAO) {
  (0, _inherits3.default)(TableSessionDAO, _BaseDAO);

  function TableSessionDAO() {
    (0, _classCallCheck3.default)(this, TableSessionDAO);
    return (0, _possibleConstructorReturn3.default)(this, (TableSessionDAO.__proto__ || Object.getPrototypeOf(TableSessionDAO)).apply(this, arguments));
  }

  return TableSessionDAO;
}(_dao2.default);

TableSessionDAO._model = _mongoose2.default.model('TableSession', new _mongoose2.default.Schema({
  password: String,
  numberOfPeople: Number,
  openedAt: Date,
  closedAt: Date,
  payments: [Number],
  tableId: { index: true, type: _mongoose.Schema.Types.ObjectId, ref: 'Table' },
  restaurantId: { index: true, type: _mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
}));
exports.default = TableSessionDAO;