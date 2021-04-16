const { gql } = require('apollo-server-express');

module.exports = gql`
    type Product {
        id: ID!
        title: String
        price: Float!
        description: String
        imgUrl: String
        categories: [Category]
    },
    extend type Query {
        products: [Product]
        product(id:ID): Product #pour chercher just ID
    },
    extend type Mutation {
        createProduct(title: String, price: Float, description: String, imgUrl: String, categories: [ID]): Product
        updateProduct(id:ID!, title: String, price: Float, description: String, imgUrl: String, categories: [ID]): Product
        deleteProduct(id:ID!): Product
    }
`