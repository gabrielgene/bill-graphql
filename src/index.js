import express from 'express';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '~/src/config';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => res.send('Hello World'));

app.listen(config.PORT || 4000);
console.warn(`Running a GraphQL API server at localhost:${config.PORT}/graphql`);
