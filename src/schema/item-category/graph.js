import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import ItemDAO from '~/src/schema/item/dao';

export default {
  type: `
    type ItemCategory {
      id: ID!,
      name: String,

      restaurant: Restaurant,
      items: [Item],
    }

    input ItemCategoryInput {
      restaurantId: ID!,
      name: String!,
    }

    input ItemCategoryPatchInput {
      name: String,
    }

    extend type Query {
      itemCategory(id: ID!): ItemCategory
    }

    extend type Mutation {
      createItemCategory(input: ItemCategoryInput!): ItemCategory
      updateItemCategory(id: ID!, patch: ItemCategoryPatchInput!): Boolean
    }
  `,

  resolvers: {
    Query: {
      itemCategory: (_, { id }) => DAO.findById(id),
    },
    Mutation: {
      createItemCategory: (_, { input }) => DAO.create(input),
      updateItemCategory: (_, { id, patch }) => DAO.update(id, patch).then(() => true),
    },
    ItemCategory: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
      items: ({ id }) => ItemDAO.find({ categoryId: id }),
    },
  },
};
