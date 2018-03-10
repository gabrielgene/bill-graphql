import DAO from './dao';

export default {
  type: `
    type Restaurant {
      id: ID!,
      name: String,
      slug: String,
    }
    type Query {
      restaurant(id: ID!): Restaurant
    }
  `,
  resolvers: {
    Query: {
      restaurant: (_, { id }) => DAO.findOne({ _id: id }),
    },
  },
};
