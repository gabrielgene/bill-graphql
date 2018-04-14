'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _dao3 = require('../restaurant-category/dao');

var _dao4 = _interopRequireDefault(_dao3);

var _dao5 = require('../item-category/dao');

var _dao6 = _interopRequireDefault(_dao5);

var _dao7 = require('../table/dao');

var _dao8 = _interopRequireDefault(_dao7);

var _dao9 = require('../table-session/dao');

var _dao10 = _interopRequireDefault(_dao9);

var _dao11 = require('../item/dao');

var _dao12 = _interopRequireDefault(_dao11);

var _dao13 = require('../order/dao');

var _dao14 = _interopRequireDefault(_dao13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    type Restaurant {\n      id: ID!\n      name: String\n      description: String\n      slug: String\n      flyerUrl: String\n      address: String\n      googleMapsUrl: String\n\n      tables: [Table]\n      tablesSessions: [TableSession]\n      categories: [RestaurantCategory]\n      itemCategories: [ItemCategory]\n      items(category: ID): [Item]\n      orders(status: OrderStatus): [Order]\n    }\n\n    input RestaurantInput {\n      name: String!\n      description: String\n      slug: String!\n      flyerUrl: String!\n      categoriesIds: [String]!\n      address: String!\n      googleMapsUrl: String\n    }\n\n    input RestaurantPatchInput {\n      name: String\n      description: String\n      slug: String\n      flyerUrl: String\n      categoriesIds: [String]\n      address: String\n      googleMapsUrl: String\n    }\n\n    extend type Query {\n      restaurant(id: ID, slug: String): Restaurant\n      restaurants(query: String): [Restaurant]\n    }\n\n    extend type Mutation {\n      createRestaurant(input: RestaurantInput!): Restaurant\n      updateRestaurant(id: ID!, patch: RestaurantPatchInput): Boolean\n    }\n  ',

  resolvers: {
    Query: {
      restaurant: function restaurant(_, _ref) {
        var id = _ref.id,
            slug = _ref.slug;
        return _dao2.default.findOne({ $or: [{ _id: id }, { slug: slug }] });
      },
      restaurants: function restaurants(_, _ref2) {
        var query = _ref2.query;
        return _dao2.default.search(query);
      }
    },

    Mutation: {
      createRestaurant: function createRestaurant(_, _ref3) {
        var input = _ref3.input;
        return _dao2.default.create(input);
      },
      updateRestaurant: function updateRestaurant(_, _ref4) {
        var id = _ref4.id,
            patch = _ref4.patch;
        return _dao2.default.update(id, patch);
      }
    },

    Restaurant: {
      tables: function tables(_ref5) {
        var id = _ref5.id;
        return _dao8.default.find({ restaurantId: id });
      },
      tablesSessions: function tablesSessions(_ref6) {
        var id = _ref6.id;
        return _dao10.default.find({ restaurantId: id });
      },
      categories: function categories(_ref7) {
        var id = _ref7.id;
        return _dao4.default.find({ restaurantId: id });
      },
      itemCategories: function itemCategories(_ref8) {
        var id = _ref8.id;
        return _dao6.default.find({ restaurantId: id });
      },
      items: function items(_ref9, _ref10) {
        var id = _ref9.id;
        var category = _ref10.category;
        return _dao12.default.find((0, _lodash.pickBy)({ restaurantId: id, categoryId: category }, _lodash.identity));
      },
      orders: function orders(_ref11, _ref12) {
        var id = _ref11.id;
        var status = _ref12.status;
        return _dao14.default.find((0, _lodash.pickBy)({ restaurantId: id, status: status }, _lodash.identity));
      }
    }
  }
};