import DAO from './dao';
import RestaurantDAO from '~/src/schema/restaurant/dao';
import ItemDAO from '~/src/schema/item/dao';

export default {
  type: `
    type Category {
      id: ID!,
      name: String,

      restaurants: [Restaurant],
    }

    input CategoryInput {
      name: String!,
    }

    input CategoryPatchInput {
      name: String,
    }

    extend type Query {
      category(id: ID!): Category
      categories: [Category]
    }

    extend type Mutation {
      createCategory(input: CategoryInput!): Category
      updateCategory(id: ID!, patch: CategoryPatchInput!): Boolean
    }
  `,

  resolvers: {
    Query: {
      category: (_, { id }) => DAO.findById(id),
      categories: () => DAO.find(),
    },
    Mutation: {
      createCategory: (_, { input }) => DAO.create(input),
      updateCategory: (_, { id, patch }) => DAO.update(id, patch).then(() => true),
    },
    Category: {
      restaurants: ({ id }) => RestaurantDAO.findByCategory(id),
    },
  },
};
