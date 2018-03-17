import { pickBy, identity } from 'lodash';

import DAO from './dao';
import TableDAO from '~/src/schema/table/dao';
import TableSessionDAO from '~/src/schema/table-session/dao';
import ItemDAO from '~/src/schema/item/dao';
import CategoryDAO from '~/src/schema/category/dao';
import OrderDAO from '~/src/schema/order/dao';

export default {
  type: `
    type Restaurant {
      id: ID!,
      name: String,
      slug: String,

      tables: [Table],
      tablesSessions: [TableSession],
      categories: [Category],
      items(category: ID): [Item],
      orders(status: OrderStatus): [Order],
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
      tablesSessions: ({ id }) =>
        TableSessionDAO.find({ restaurantId: id }),
      categories: ({ id }) => CategoryDAO.find({ restaurantId: id }),
      items: ({ id }, { category }) =>
        ItemDAO.find(pickBy({ restaurantId: id, categoryId: category }, identity)),
      orders: ({ id }, { status }) =>
        OrderDAO.find(pickBy({ restaurantId: id, status }, identity)),
    },
  },
};
