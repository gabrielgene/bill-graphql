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
      flyerUrl: String,

      tables: [Table],
      tablesSessions: [TableSession],
      categories: [Category],
      items(category: ID): [Item],
      orders(status: OrderStatus): [Order],
    }

    input RestaurantInput {
      name: String!
      slug: String!
      flyerUrl: String!
      categoriesIds: [String]!
    }

    input RestaurantPatchInput {
      name: String
      slug: String
      flyerUrl: String
      categoriesIds: [String]
    }

    extend type Query {
      restaurant(id: ID, slug: String): Restaurant
      restaurants(query: String): [Restaurant]
    }

    extend type Mutation {
      createRestaurant(input: RestaurantInput!): Restaurant
      updateRestaurant(id: ID!, patch: RestaurantPatchInput): Boolean
    }
  `,

  resolvers: {
    Query: {
      restaurant: (_, { id, slug }) => DAO.findOne({ $or: [{ _id: id }, { slug }] }),
      restaurants: (_, { query }) => DAO.search(query),
    },

    Mutation: {
      createRestaurant: (_, { input }) => DAO.create(input),
      updateRestaurant: (_, { id, patch }) => DAO.update(id, patch),
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
