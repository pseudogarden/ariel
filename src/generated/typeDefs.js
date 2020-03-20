import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    currentUser: User!
  }
  type User {
    id: Int!
    username: String!
    email: String!
  }
  type Login {
    token: String!
    user: User!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): Login!
  }
`;

module.exports = typeDefs;
