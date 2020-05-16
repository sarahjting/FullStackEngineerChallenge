const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type User {
    id: String
    name: String
    isAdmin: Boolean
  }
  type Query {
    user(name: String): User
  }
`;
