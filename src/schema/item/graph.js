import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';

export default {
  type: `
    type Item {
      id: ID!,
      name: String,
      description: String,
      price: String,

      restaurant: Restaurant,
      image: Image,
    }

    input ItemInput {
      name: String!,
      restaurantId: ID!,
      description: String!,
      price: Float!,
      image: ImageInput,
    }

    input ItemPatchInput {
      name: String,
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
    }
  `,

  resolvers: {
    Query: {
      item: (_, { id }) => DAO.findById(id),
    },

    Mutation: {
      createItem: (_, { input }) => DAO.create(input),
      updateItem: (_, { id, patch }) => DAO.update(id, patch),
    },

    Item: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
    },
  },
};
