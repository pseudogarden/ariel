import bcrypt from 'bcryptjs';
import { GraphQLDate } from 'graphql-iso-date';
import jwt from 'jsonwebtoken';
import env from '../config/env';

const { SECRET } = env;

const resolvers = {

  Date: GraphQLDate,
  Query: {
    currentUser: async (parent, args, { user, models }) => {
      if (!user) throw new Error('Not Authorized');
      return models.User.findOne({ where: { id: user.id } });
    },
    getUser: async (root, { username }, { models }) => models.User.findOne({ where: { username } }),
    getBooks: async (root, { username }, { user, models }) => {
      if (username) {
        const askedUser = await models.User.findOne({ where: { username } });
        return models.Book.findAll({ where: { userId: askedUser.id } });
      }
      return models.Book.findAll({ where: { userId: user.id } });
    },
  },

  Mutation: {
    signup: async (parent, { username, email, password }, { models }) => {
      let member = await models.User.findOne({ where: { username } });
      if (member) throw new Error('username is taken');
      member = await models.User.findOne({ where: { email } });
      if (member) throw new Error('User with email exists');
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await models.User.create({ username, email, password: hashedPassword });
      return user;
    },
    login: async (parent, { email, password }, { req, models }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) throw new Error('User does not exist');
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error('password is invalid');
      const token = jwt.sign({
        id: user.id,
        email: user.email
      }, SECRET, { expiresIn: '3d' });
      req.res.cookie('token', token, { maxAge: 70000000, httpOnly: true });
      return { token, user };
    },
    addBook: async (parent, {
      title,
      author,
      description,
      publishDate
    }, { user, models }) => models.Book.create({
      userId: user.id,
      title,
      author,
      description,
      publishDate,
    }),
  },

  User: {
    book: async (book) => book.getBooks()
  },

  Book: {
    user: async (user) => user.getUser()
  }

};

module.exports = resolvers;
