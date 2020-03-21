import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import { typeDefs, resolvers } from './generated';
import models from './models';
import env from './config/env';

// middleware

const jwtCheck = (token) => {
  try {
    if (token) return jwt.verify(token, env.SECRET);
    return null;
  } catch (error) {
    return null;
  }
};

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenCookie = req.headers.cookie || '';
    const token = tokenCookie.split('=')[1];
    const user = jwtCheck(token);
    return { req, user, models };
  }
});

// server
const app = express();
server.applyMiddleware({ app });

// sync and authenticate all db models
models.sequelize.authenticate();
models.sequelize.sync();

app.listen(3000, () => console.log(`listening on port http://localhost:3000${server.graphqlPath} 🚀 `));
