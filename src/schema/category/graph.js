import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import ItemDAO from '~/src/schema/item/dao';

export default {
  type: `
    type Category {
      id: ID!,
      name: String,

      restaurant: Restaurant,
      items: [Item],
    }

    input CategoryInput {
      restaurantId: ID!,
      name: String!,
    }

    input CategoryPatchInput {
      name: String,
    }

    extend type Query {
      category(id: ID!): Category
    }

    extend type Mutation {
      createCategory(input: CategoryInput!): Category
      updateCategory(id: ID!, patch: CategoryPatchInput!): Boolean
    }
  `,

  resolvers: {
    Query: {
      category: (_, { id }) => DAO.findById(id),
    },
    Mutation: {
      createCategory: (_, { input }) => DAO.create(input),
      updateCategory: (_, { id, patch }) => DAO.update(id, patch).then(() => true),
    },
    Category: {
      restaurant: ({ restaurantId }) => RestaurantDAO.findById(restaurantId),
      items: ({ id }) => ItemDAO.find({ categoryId: id }),
    },
  },
};
