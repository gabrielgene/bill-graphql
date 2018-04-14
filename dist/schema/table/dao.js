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

var TableDAO = function (_BaseDAO) {
  (0, _inherits3.default)(TableDAO, _BaseDAO);

  function TableDAO() {
    (0, _classCallCheck3.default)(this, TableDAO);
    return (0, _possibleConstructorReturn3.default)(this, (TableDAO.__proto__ || Object.getPrototypeOf(TableDAO)).apply(this, arguments));
  }

  return TableDAO;
}(_dao2.default);

TableDAO._model = _mongoose2.default.model('Table', new _mongoose2.default.Schema({
  restaurantId: { index: true, type: _mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  slug: { index: true, type: String, unique: true },
  name: String
}));
exports.default = TableDAO;