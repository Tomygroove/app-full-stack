const { gql } = require('apollo-server-express');

const productSchema = require('./productSchema.js');
const userSchema = require('./userSchema.js');
const orderSchema = require('./orderSchema.js');

const linkSchema = gql`
    type Query {
        _:Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

module.exports = [linkSchema, productSchema, userSchema, orderSchema]