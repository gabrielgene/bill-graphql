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
      restaurant(id: ID, slug: String): Restaurant
    }
    type Mutation {
      createRestaurant(input: RestaurantInput!): Restaurant
    }
  `,

  resolvers: {
    Query: {
      restaurant: (_, { id, slug }) => DAO.findOne({ $or: [{ _id: id }, { slug }] }),
    },
    Mutation: {
      createRestaurant: (_, { input }) => DAO.create(input),
    }
  },
};
