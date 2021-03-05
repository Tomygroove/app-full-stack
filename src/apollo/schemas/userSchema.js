const {gql} = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isAdmin: Boolean!
  }
  extend type Query {
    users: [User]
    user(id: ID!): User
  },
  extend type Mutation {
       createUser(firstName: String, lastName: String, email: String, isAdmin: Boolean): User
       updateUser(id: ID!, firstName: String, lastName: String, email: String, isAdmin: Boolean): User
       deleteUser(id: ID!): User
  }
`;