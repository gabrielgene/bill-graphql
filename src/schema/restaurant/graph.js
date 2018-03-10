import DAO from './dao';

export default {
  type: `
    type Restaurant {
      id: ID!,
      name: String,
      slug: String,
    }
    input RestaurantInput {
      name: String!,
      slug: String!,
    }
    type Query {
      restaurant(id: ID!): Restaurant
    }
    type Mutation {
      createRestaurant(input: RestaurantInput!): Restaurant
    }
  `,
  resolvers: {
    Query: {
      restaurant: (_, { id }) => DAO.findOne({ _id: id }),
    },
    Mutation: {
      createRestaurant: (_, { input }) => DAO.create(input),
    }
  },
};
