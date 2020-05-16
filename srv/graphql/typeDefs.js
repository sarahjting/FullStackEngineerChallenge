const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    foo: String
  }
`;
