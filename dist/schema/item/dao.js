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

var _schema = require('../image/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemDAO = function (_BaseDAO) {
  (0, _inherits3.default)(ItemDAO, _BaseDAO);

  function ItemDAO() {
    (0, _classCallCheck3.default)(this, ItemDAO);
    return (0, _possibleConstructorReturn3.default)(this, (ItemDAO.__proto__ || Object.getPrototypeOf(ItemDAO)).apply(this, arguments));
  }

  return ItemDAO;
}(_dao2.default);

ItemDAO._model = _mongoose2.default.model('Item', new _mongoose2.default.Schema({
  restaurantId: { type: _mongoose.Schema.Types.ObjectId, index: true, ref: 'Restaurant' },
  categoryId: { type: _mongoose.Schema.Types.ObjectId, index: true, ref: 'Category' },
  name: String,
  description: String,
  price: Number,
  image: _schema2.default,
  isAdditional: Boolean
}));
exports.default = ItemDAO;