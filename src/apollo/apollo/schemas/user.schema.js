const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        isAdmin: Boolean
        phone: Number
        adress: String
    },
    input OrderInput {
        firstName: String
        lastName: String
        email: String
        isAdmin: Boolean
        phone: Number
        address: String
    },
    extend type Query {
        users: [User]
        user(id:ID): User #pour chercher just ID
    },
    extend type Mutation {
        createUser(input:OrderInput): User
        updateUser(id:ID!, input:OrderInput): User
        deleteUser(id:ID!): User
    }
    
`