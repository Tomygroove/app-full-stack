const { gql } = require('apollo-server-express');

const productSchema = require('./product.schema');
const orderSchema = require('./order.schema');
const userSchema = require('./user.schema');
const categorySchema = require('./category.schema');

const linkSchema = gql`
    type Query {
        _:Boolean
    }
    type Mutation {
        _:Boolean
    }
`;

module.exports = [linkSchema, productSchema, orderSchema, userSchema, categorySchema]