import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env';

const { SECRET } = env;

const resolvers = {
  Query: {
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
    login: async (parent, { email, password }, { models }) => {
      const user = await models.User.findOne({ where: { email } });
      if (!user) throw new Error('User does not exist');
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error('password is invalid');
      const token = jwt.sign({
        id: user.id,
        email: user.email
      }, SECRET, { expiresIn: '3d' });
      return { token, user };
    },
  },
};

module.exports = resolvers;
