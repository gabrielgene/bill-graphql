import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';

export default {
  type: `
    type Table {
      id: ID!,
      name: String,
      slug: String,

      restaurant: Restaurant,
    }

    input TableInput {
      restaurantId: ID!,
      name: String!,
      slug: String!,
    }

    extend type Query {
      table(id: ID): Table
    }

    extend type Mutation {
      createTable(input: TableInput!): Table
    }
  `,

  resolvers: {
    Query: {
      table: (_, { id }) => DAO.findOne({ _id: id }),
    },
    Mutation: {
      createTable: (_, { input }) => DAO.create(input),
    },
    Table: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findOne({ _id: restaurantId }),
    },
  },
};
