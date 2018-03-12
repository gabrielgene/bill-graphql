import glob from 'glob';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

const SchemaDefinition = `
  schema { query: Query, mutation: Mutation }
  type Query
  type Mutation
`;

const schema = glob.sync(`${__dirname}/!(base)/graph.js`)
  .reduce((obj, file) => {
    const { type, resolvers } = require(file).default;
    obj.typeDefs.push(type);
    merge(obj.resolvers, resolvers);
    return obj;
  }, { typeDefs: [SchemaDefinition], resolvers: {} });

export default makeExecutableSchema(schema);
