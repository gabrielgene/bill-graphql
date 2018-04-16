import { pickBy, identity } from 'lodash';

import DAO from './dao';
import RestaurantCategoryDAO from '~/src/schema/restaurant-category/dao';
import ItemCategoryDAO from '~/src/schema/item-category/dao';
import TableDAO from '~/src/schema/table/dao';
import TableSessionDAO from '~/src/schema/table-session/dao';
import ItemDAO from '~/src/schema/item/dao';
import OrderDAO from '~/src/schema/order/dao';

export default {
  type: `
    type Restaurant {
      id: ID!
      name: String
      description: String
      slug: String
      flyer: Image
      address: String
      googleMapsUrl: String
      workingHours: [[[Int]]]

      tables: [Table]
      tablesSessions: [TableSession]
      category: RestaurantCategory
      itemCategories: [ItemCategory]
      items(category: ID): [Item]
      orders(status: OrderStatus): [Order]
    }

    input RestaurantInput {
      name: String!
      description: String
      slug: String!
      flyer: ImageInput!
      categoryId: String!
      address: String!
      googleMapsUrl: String
      workingHours: [[[Int]]]
    }

    input RestaurantPatchInput {
      name: String
      description: String
      slug: String
      flyer: ImageInput
      categoryId: String
      address: String
      googleMapsUrl: String
      workingHours: [[[Int]]]
    }

    extend type Query {
      restaurant(id: ID, slug: String): Restaurant
      restaurants(query: String): [Restaurant]
    }

    extend type Mutation {
      createRestaurant(input: RestaurantInput!): Restaurant
      updateRestaurant(id: ID!, patch: RestaurantPatchInput): Boolean
      importRestaurant(input: JSON!): Boolean
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
      importRestaurant: async (_, { input }) => {
        const { categoryName, itemCategories, ...restaurantArgs } = input;

        const restaurantCategory =
          await RestaurantCategoryDAO.findOne({ name: categoryName })
          || await RestaurantCategoryDAO.create({ name: categoryName });

        const restaurant = await DAO.create({
          categoryId: restaurantCategory.id,
          ...restaurantArgs,
        });

        await Promise.all(itemCategories.map(async ({ name, items }) => {
          const category = await ItemCategoryDAO.create({
            restaurantId: restaurant.id,
            name,
          });

          return Promise.all(items.map(
            i => ItemDAO.create({
              ...i,
              restaurantId: restaurant.id,
              categoryId: category.id,
            })
          ));
        }));

        return true;
      },
    },

    Restaurant: {
      tables: ({ id }) => TableDAO.find({ restaurantId: id }),
      tablesSessions: ({ id }) =>
        TableSessionDAO.find({ restaurantId: id }),
      category: ({ id }) => RestaurantCategoryDAO.find({ restaurantId: id }),
      itemCategories: ({ id }) => ItemCategoryDAO.find({ restaurantId: id }),
      items: ({ id }, { category }) =>
        ItemDAO.find(pickBy({ restaurantId: id, categoryId: category }, identity)),
      orders: ({ id }, { status }) =>
        OrderDAO.find(pickBy({ restaurantId: id, status }, identity)),
    },
  },
};
