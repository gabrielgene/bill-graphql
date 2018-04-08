import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import ItemDAO from '~/src/schema/item/dao';

export default {
  type: `
    type RestaurantCategory {
      id: ID!,
      name: String,

      restaurants: [Restaurant],
    }

    input RestaurantCategoryInput {
      name: String!,
    }

    input RestaurantCategoryPatchInput {
      name: String,
    }

    extend type Query {
      restaurantCategory(id: ID!): RestaurantCategory
      restaurantCategories: [RestaurantCategory]
    }

    extend type Mutation {
      createRestaurantCategory(input: RestaurantCategoryInput!): RestaurantCategory
      updateRestaurantCategory(id: ID!, patch: RestaurantCategoryPatchInput!): Boolean
    }
  `,

  resolvers: {
    Query: {
      restaurantCategory: (_, { id }) => DAO.findById(id),
      restaurantCategories: () => DAO.find(),
    },
    Mutation: {
      createRestaurantCategory: (_, { input }) => DAO.create(input),
      updateRestaurantCategory: (_, { id, patch }) => DAO.update(id, patch).then(() => true),
    },
    RestaurantCategory: {
      restaurants: ({ id }) => RestaurantDAO.findByCategory(id),
    },
  },
};
