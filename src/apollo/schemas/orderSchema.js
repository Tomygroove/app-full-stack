const {gql} = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID
    totalAmount: Float
    user: User
    products: [Product]
  }
  extend type Query {
    orders: [Order]
    order(id: ID): Order
  },
  extend type Mutation {
       createOrder(totalAmount: Float, user: ID, products: [ID]): Order
       updateOrder(id: ID, totalAmount: Float, user: ID, products: [ID]): Order
       deleteOrder(id: ID): Order
  }
`;