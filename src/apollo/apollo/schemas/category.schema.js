import { gql } from 'apollo-server-express';

module.exports = gql`
    type Category {
        id: ID!
        title: String
        products: [Product]
    }
    input CategoryInput {
        title: String
        products: [ID]
    }
    extend type Query {
        categories:[Category],
        category(id:ID): Category
    }
    extend type Mutation {
        createCategory(input:CategoryInput): Category
    }
`