'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dao = require('../base/dao');

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestaurantDAO = function (_BaseDAO) {
  (0, _inherits3.default)(RestaurantDAO, _BaseDAO);

  function RestaurantDAO() {
    (0, _classCallCheck3.default)(this, RestaurantDAO);
    return (0, _possibleConstructorReturn3.default)(this, (RestaurantDAO.__proto__ || Object.getPrototypeOf(RestaurantDAO)).apply(this, arguments));
  }

  (0, _createClass3.default)(RestaurantDAO, null, [{
    key: 'search',
    value: function search(term) {
      var name = { $regex: new RegExp(term.trim().replace(/(\s+)/g, '[\\s\\S]*\\b'), 'i') };
      return this.find({ name: name });
    }
  }, {
    key: 'findByCategory',
    value: function findByCategory(categoryId) {
      return this.find({ categoriesIds: categoryId });
    }
  }]);
  return RestaurantDAO;
}(_dao2.default);

RestaurantDAO._model = _mongoose2.default.model('Restaurant', new _mongoose2.default.Schema({
  slug: { index: true, type: String, unique: true },
  categoriesIds: [{ index: true, type: _mongoose.Schema.ObjectId, ref: 'RestaurantCategory' }],
  name: String,
  description: String,
  flyerUrl: String,
  address: String,
  googleMapsUrl: String
}));
exports.default = RestaurantDAO;