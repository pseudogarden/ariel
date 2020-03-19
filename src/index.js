import express from 'express';
import { gql, ApolloServer } from 'apollo-server-express';

// gql schema
const typeDefs = gql`
  type Query {
    message: String
  }
`;

// resolver
const resolvers = {
  Query: {
    message: () => 'Hello World!'
  },
};

// apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// server
const app = express();
server.applyMiddleware({ app });


app.listen(3000, () => console.log(`listening on port http://localhost:3000${server.graphqlPath} 🚀 `));
