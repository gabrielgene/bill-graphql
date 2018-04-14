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
  type: '\n    type ItemCategory {\n      id: ID!,\n      name: String,\n\n      restaurant: Restaurant,\n      items: [Item],\n    }\n\n    input ItemCategoryInput {\n      restaurantId: ID!,\n      name: String!,\n    }\n\n    input ItemCategoryPatchInput {\n      name: String,\n    }\n\n    extend type Query {\n      itemCategory(id: ID!): ItemCategory\n    }\n\n    extend type Mutation {\n      createItemCategory(input: ItemCategoryInput!): ItemCategory\n      updateItemCategory(id: ID!, patch: ItemCategoryPatchInput!): Boolean\n    }\n  ',

  resolvers: {
    Query: {
      itemCategory: function itemCategory(_, _ref) {
        var id = _ref.id;
        return _dao2.default.findById(id);
      }
    },
    Mutation: {
      createItemCategory: function createItemCategory(_, _ref2) {
        var input = _ref2.input;
        return _dao2.default.create(input);
      },
      updateItemCategory: function updateItemCategory(_, _ref3) {
        var id = _ref3.id,
            patch = _ref3.patch;
        return _dao2.default.update(id, patch).then(function () {
          return true;
        });
      }
    },
    ItemCategory: {
      restaurant: function restaurant(_ref4) {
        var restaurantId = _ref4.restaurantId;
        return _dao4.default.findById(restaurantId);
      },
      items: function items(_ref5) {
        var id = _ref5.id;
        return _dao6.default.find({ itemCategoryId: id });
      }
    }
  }
};