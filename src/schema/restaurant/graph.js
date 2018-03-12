import DAO from './dao';
import TableDAO from '~/src/schema/table/dao';

export default {
  type: `
    type Restaurant {
      id: ID!,
      name: String,
      slug: String,

      tables: [Table],
    }
    input RestaurantInput {
      name: String!,
      slug: String!,
    }
    extend type Query {
      restaurant(id: ID, slug: String): Restaurant
    }
    extend type Mutation {
      createRestaurant(input: RestaurantInput!): Restaurant
    }
  `,

  resolvers: {
    Query: {
      restaurant: (_, { id, slug }) => DAO.findOne({ $or: [{ _id: id }, { slug }] }),
    },

    Mutation: {
      createRestaurant: (_, { input }) => DAO.create(input),
    },

    Restaurant: {
      tables: ({ id }) => TableDAO.find({ restaurantId: id }),
    },
  },
};
