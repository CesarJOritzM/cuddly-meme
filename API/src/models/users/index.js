import { gql } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 2)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const typeDefs = gql`
  scalar Date

  enum Gender {
    Male
    Female
    Undefined
  }
  type User {
    _id: ID
    name: String
    lastName: String
    date: Date
    gender: Gender
    height: Float
    colombian: Boolean
  }

  type Query {
    AllUsers: [User]!
    User(_id: ID!): User
  }

  type Mutation {
    CreateUser(
      name: String
      lastName: String
      date: Date
      gender: Gender
      height: Float
      colombian: Boolean
    ): User
    DeleteUser(_id: ID!): User
  }
`;
const resolvers = {
  Date: dateScalar,
  Query: {
    AllUsers: async (parent, args, { User }) => {
      const user = await User.find();
      return user.map((el) => {
        return el;
      });
    },
    User: async (parent, args, { User }) => {
      const { _id } = args;
      const user = await User.findById(_id);
      return user;
    },
  },
  Mutation: {
    CreateUser: async (parent, args, { User }) => {
      const user = await new User(args).save();
      return user;
    },
    DeleteUser: async (parent, args, { User }) => {
      const { _id } = args;
      const user = await User.findById(_id);
      await User.deleteOne({ _id });
      return user;
    },
  },
};

export { typeDefs, resolvers };
