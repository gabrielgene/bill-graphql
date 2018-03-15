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
    }

    input ItemInput {
      name: String!,
      restaurantId: ID!,
      description: String!,
      price: Float!,
    }

    extend type Query {
      item(id: ID): Item
    }

    extend type Mutation {
      createItem(input: ItemInput!): Item
    }
  `,

  resolvers: {
    Query: {
      item: (_, { id }) => DAO.findById(id),
    },

    Mutation: {
      createItem: (_, { input }) => DAO.create(input),
    },

    Item: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
    },
  },
};
