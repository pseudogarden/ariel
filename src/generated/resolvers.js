import bcrypt from 'bcryptjs';

const resolvers = {
  Query: {
  },
  Mutation: {
    signup: async (parent, { username, email, password }, { models }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await models.User.create({ username, email, password: hashedPassword });
      return user;
    }
  },
};

module.exports = resolvers;
