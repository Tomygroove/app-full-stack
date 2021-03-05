// const Product = require('../../models/productModel');

module.exports = {
    Query: {
        products: () => {
            Product.find();
        },
        product: (parent, args) => {
            Product.findById(args.id);
        }
    },
    Mutation: {
        createProduct: (parent, args) => {
            const productNew = new Product ({
                title: args.title,
                price: args.price,
                description: args.description,
            });
            return productNew.save();
        },
        updateProduct: (parent, args) => {
            const productUpdate = new Product ({
                title: args.title,
                price: args.price,
                description: args.description,
            });
            return productNew.save();
        },
        deleteProduct: (parent, args) => {
            const productNew = new Product ({
                title: args.title,
                price: args.price,
                description: args.description,
            });
            return productNew.save();
        }
    }
}