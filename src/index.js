import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './generated';
import models from './models';

// apollo server
const server = new ApolloServer({ typeDefs, resolvers, context: { models } });

// server
const app = express();
server.applyMiddleware({ app });

// sync and authenticate all db models
models.sequelize.authenticate();
models.sequelize.sync();

app.listen(3000, () => console.log(`listening on port http://localhost:3000${server.graphqlPath} 🚀 `));
