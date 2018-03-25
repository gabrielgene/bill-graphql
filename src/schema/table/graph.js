import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import TableSessionDAO from '~/src/schema/table-session/dao';

export default {
  type: `
    type Table {
      id: ID!,
      name: String,
      slug: String,

      restaurant: Restaurant,
      openSessions: [TableSession],
    }

    input TableInput {
      restaurantId: ID!,
      name: String!,
      slug: String!,
    }

    extend type Query {
      table(id: ID!): Table
    }

    extend type Mutation {
      createTable(input: TableInput!): Table
    }
  `,

  resolvers: {
    Query: {
      table: (_, { id }) => DAO.findById(id),
    },
    Mutation: {
      createTable: (_, { input }) => DAO.create(input),
    },
    Table: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
      openSessions: ({ id }) => TableSessionDAO.find({
        tableId: id,
        closedAt: null,
      }),
    },
  },
};
