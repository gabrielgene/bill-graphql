import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import ItemDAO from '~/src/schema/item/dao';
import TableDAO from '~/src/schema/table/dao';
import TableSessionDAO from '~/src/schema/table-session/dao';

export default {
  type: `
    type Order {
      id: ID!
      details: String
      status: OrderStatus

      restaurant: Restaurant
      table: Table
      tableSession: TableSession
      item: Item
      aditionals: [Item]
    }

    input OrderInput {
      tableSession: ID!
      itemId: ID!
      details: String
      aditionals: [ID]
    }

    input OrderPatchInput {
      itemId: ID!
      details: String
      aditionals: [ID]
    }

    extend type Query {
      order(id: ID!): Order
    }

    extend type Mutation {
      createOrder(input: OrderInput!): Order
      updateOrder(id: ID!, patch: OrderPatchInput!): Boolean
    }
  `,

  resolvers: {
    Query: {
      order: (_, { id }) => DAO.findById(id),
    },
    Mutation: {
      createOrder: async (_, { input }) => {
        const { restaurantId, tableId } = await TableSessionDAO.findById(input.tableSession);
        return DAO.create({ ...input, restaurantId, tableId });
      },
      updateOrder: (_, { id, patch }) => DAO.update(id, patch).then(() => true),
    },
    Order: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
      table: ({ tableId }) => ItemDAO.findById(tableId),
      tableSession: ({ tableSessionId }) => TableSessionDAO.findById(tableSessionId),
      item: ({ itemId }) => ItemDAO.findById(itemId),
      aditionals: ({ aditionals }) => ItemDAO.find({ id: { $in: aditionals } }),
    },
  },
};
