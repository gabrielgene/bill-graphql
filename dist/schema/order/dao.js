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

var _enumerations = require('../enumerations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderDAO = function (_BaseDAO) {
  (0, _inherits3.default)(OrderDAO, _BaseDAO);

  function OrderDAO() {
    (0, _classCallCheck3.default)(this, OrderDAO);
    return (0, _possibleConstructorReturn3.default)(this, (OrderDAO.__proto__ || Object.getPrototypeOf(OrderDAO)).apply(this, arguments));
  }

  return OrderDAO;
}(_dao2.default);

OrderDAO._model = _mongoose2.default.model('Order', new _mongoose2.default.Schema({
  tableSessionId: { index: true, type: _mongoose.Schema.Types.ObjectId, ref: 'TableSession' },
  restaurantId: { index: true, type: _mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  itemId: { type: _mongoose.Schema.Types.ObjectId, ref: 'Item' },
  aditionals: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  status: { type: String, enum: _enumerations.OrderStatus, default: 'PENDING' },
  details: String
}));
exports.default = OrderDAO;