import DAO from './dao';
import TableDAO from '~/src/schema/table/dao';
import TableSessionDAO from '~/src/schema/table-session/dao';
import ItemDAO from '~/src/schema/item/dao';

export default {
  type: `
    type Restaurant {
      id: ID!,
      name: String,
      slug: String,

      tables: [Table],
      tablesSessions: [TableSession],
      items: [Item],
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
      items: ({ id }) => ItemDAO.find({ restaurantId: id }),
    },
  },
};
