import GraphqlDate from 'graphql-date';

export default {
  type: `
    scalar Date
  `,

  resolvers: { Date: GraphqlDate },
};
