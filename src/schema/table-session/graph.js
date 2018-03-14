import invariant from 'invariant';

import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import TableDAO from '~/src/schema/table/dao';

export default {
  type: `
    type TableSession {
      id: ID!,
      password: String,
      numberOfPeople: Int,
      openedAt: Date,
      closedAt: Date,

      table: Table,
      restaurant: Restaurant,
    }

    input TableSessionInput {
      tableId: ID!,
      openedAt: Date!,
      password: String,
      numberOfPeople: Int,
    }

    extend type Query {
      tableSession(id: ID!): TableSession
    }

    extend type Mutation {
      createTableSession(input: TableSessionInput!): TableSession
      closeTableSession(id: ID!, closedAt: Date): TableSession
    }
  `,

  resolvers: {
    Query: {
      tableSession: (_, { id }) => DAO.findById(id),
    },
    Mutation: {
      createTableSession: async (_, { input }) => {
        const table = await TableDAO.findById(input.tableId);
        invariant(!!table, 'Entity.NOT_FOUND(Table)');
        return DAO.create({ ...input, restaurantId: table.restaurantId });
      },
      closeTableSession: (_, { id, closedAt }) => DAO.update(id, { closedAt }),
    },
    TableSession: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
      table: ({ tableId }) => TableDAO.findById(tableId),
    },
  },
};
