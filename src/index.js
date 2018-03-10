import express from 'express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from '~/src/config';
import { connectDB } from '~/src/db';
import Schema from '~/src/schema';

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => res.send('Hello World'));
app.use('/graphql', graphqlExpress({ schema: Schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(config.PORT || 4000);
console.warn(`Running a GraphQL API server at localhost:${config.PORT}/graphql`);
