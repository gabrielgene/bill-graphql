'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _dao3 = require('../restaurant/dao');

var _dao4 = _interopRequireDefault(_dao3);

var _dao5 = require('../item-category/dao');

var _dao6 = _interopRequireDefault(_dao5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  type: '\n    type Item {\n      id: ID!,\n      name: String,\n      description: String,\n      price: String,\n      isAdditional: Boolean,\n\n      restaurant: Restaurant,\n      category: ItemCategory,\n      image: Image,\n    }\n\n    input ItemInput {\n      name: String!,\n      restaurantId: ID!,\n      categoryId: ID!,\n      description: String!,\n      price: Float!,\n      image: ImageInput,\n      isAdditional: Boolean,\n    }\n\n    input ItemPatchInput {\n      name: String,\n      categoryId: ID,\n      description: String,\n      price: Float,\n      image: ImageInput,\n    }\n\n    extend type Query {\n      item(id: ID): Item\n    }\n\n    extend type Mutation {\n      createItem(input: ItemInput!): Item\n      updateItem(id: ID!, patch: ItemPatchInput!): Boolean\n      bulkUpdateItem(ids: [ID]!, patch: ItemPatchInput!): Boolean\n    }\n  ',

  resolvers: {
    Query: {
      item: function item(_, _ref) {
        var id = _ref.id;
        return _dao2.default.findById(id);
      }
    },

    Mutation: {
      createItem: function createItem(_, _ref2) {
        var input = _ref2.input;
        return _dao2.default.create(input);
      },
      updateItem: function updateItem(_, _ref3) {
        var id = _ref3.id,
            patch = _ref3.patch;
        return _dao2.default.update(id, patch);
      },
      bulkUpdateItem: function bulkUpdateItem(_, _ref4) {
        var ids = _ref4.ids,
            patch = _ref4.patch;
        return _dao2.default.bulkUpdate(ids, patch);
      }
    },

    Item: {
      restaurant: function restaurant(_ref5) {
        var restaurantId = _ref5.restaurantId;
        return _dao4.default.findById(restaurantId);
      },
      category: function category(_ref6) {
        var categoryId = _ref6.categoryId;
        return _dao6.default.findById(categoryId);
      }
    }
  }
};