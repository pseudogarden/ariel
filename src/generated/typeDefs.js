import { gql } from 'apollo-server-express';

const typeDefs = gql`

  scalar Date

  type User {
    id: Int!
    username: String!
    email: String!
    book: [Book!]!
  }

  type Login {
    user: User!
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    description: String!
    publishDate: Date!
    user: User!
  }

  type Query {
    currentUser: User!
    getUser: User
    getBooks(username: String): [Book]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): Login!
    addBook(title: String!, author: String!, description: String!, publishDate: Date!): Book!
  }
`;

module.exports = typeDefs;
