const Product = require('../../models/product.model')

module.exports = {
    
    Query: {
        
        products: () => {
            return Product.find();
        },
        product: (parent, args) => {
            console.log(args.id)
            return Product.findById(args.id)
        }
    },
    Mutation: {
        createProduct: (parent, args) => {
            const newProduct = new Product({
                title: args.title,
                price: args.price,
                description: args.description,
                imgUrl: args.imgUrl,
                category: args.category
            });

            return newProduct.save();
        },
        updateProduct: (parent, args) => {
            return Product.findOneAndUpdate({id:args.id, title: args.title, price: args.price, description: args.description, imgUrl: args.imgUrl, category: args.category})
        },
        deleteProduct: (parent, args) => {
            return Product.findById({id:args.id})
        }
    }
}