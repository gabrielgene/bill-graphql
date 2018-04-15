import Date from 'graphql-date';
import JSON from 'graphql-type-json';

export default {
  type: `
    scalar Date
    scalar JSON
  `,

  resolvers: { Date },
  resolvers: { JSON },
};
