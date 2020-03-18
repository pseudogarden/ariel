import express from 'express';
import gqlHTTP from 'express-graphql';
import { graphql, buildSchema } from 'graphql';

// gql schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// resolver
const root = {
  message: () => 'Hello World!'
};

// server
const app = express();
app.use('/graphql', gqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, () => console.log('listening on port 3000 🚀 '));
