'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _dao3 = require('../restaurant/dao');

var _dao4 = _interopRequireDefault(_dao3);

var _dao5 = require('../item/dao');

var _dao6 = _interopRequireDefault(_dao5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    type RestaurantCategory {\n      id: ID!,\n      name: String,\n\n      restaurants: [Restaurant],\n    }\n\n    input RestaurantCategoryInput {\n      name: String!,\n    }\n\n    input RestaurantCategoryPatchInput {\n      name: String,\n    }\n\n    extend type Query {\n      restaurantCategory(id: ID!): RestaurantCategory\n      restaurantCategories: [RestaurantCategory]\n    }\n\n    extend type Mutation {\n      createRestaurantCategory(input: RestaurantCategoryInput!): RestaurantCategory\n      updateRestaurantCategory(id: ID!, patch: RestaurantCategoryPatchInput!): Boolean\n    }\n  ',

  resolvers: {
    Query: {
      restaurantCategory: function restaurantCategory(_, _ref) {
        var id = _ref.id;
        return _dao2.default.findById(id);
      },
      restaurantCategories: function restaurantCategories() {
        return _dao2.default.find();
      }
    },
    Mutation: {
      createRestaurantCategory: function createRestaurantCategory(_, _ref2) {
        var input = _ref2.input;
        return _dao2.default.create(input);
      },
      updateRestaurantCategory: function updateRestaurantCategory(_, _ref3) {
        var id = _ref3.id,
            patch = _ref3.patch;
        return _dao2.default.update(id, patch).then(function () {
          return true;
        });
      }
    },
    RestaurantCategory: {
      restaurants: function restaurants(_ref4) {
        var id = _ref4.id;
        return _dao4.default.findByCategory(id);
      }
    }
  }
};