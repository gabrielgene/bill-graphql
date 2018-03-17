import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import CategoryDAO from '~/src/schema/category/dao';

export default {
  type: `
    type Item {
      id: ID!,
      name: String,
      description: String,
      price: String,
      isAdditional: Boolean,

      restaurant: Restaurant,
      category: Category,
      image: Image,
    }

    input ItemInput {
      name: String!,
      restaurantId: ID!,
      categoryId: ID!,
      description: String!,
      price: Float!,
      image: ImageInput,
      isAdditional: Boolean,
    }

    input ItemPatchInput {
      name: String,
      categoryId: ID,
      description: String,
      price: Float,
      image: ImageInput,
    }

    extend type Query {
      item(id: ID): Item
    }

    extend type Mutation {
      createItem(input: ItemInput!): Item
      updateItem(id: ID!, patch: ItemPatchInput!): Boolean
      bulkUpdateItem(ids: [ID]!, patch: ItemPatchInput!): Boolean
    }
  `,

  resolvers: {
    Query: {
      item: (_, { id }) => DAO.findById(id),
    },

    Mutation: {
      createItem: (_, { input }) => DAO.create(input),
      updateItem: (_, { id, patch }) => DAO.update(id, patch),
      bulkUpdateItem: (_, { ids, patch }) => DAO.bulkUpdate(ids, patch),
    },

    Item: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
      category: ({ categoryId }) => CategoryDAO.findById(categoryId),
    },
  },
};
