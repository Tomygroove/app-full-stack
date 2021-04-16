const Category = require('../../models/category.model')

module.exports = {
    
    Query: {
        
        categories: () => {
            return Order.find()
            .populate('products')
        },
        order: (parent, args) => {
            console.log(args.id)
            return Order.findById(args.id).populate('products')
        }
    },
    Mutation: {
        createProduct: (parent, args) => {
            const newOrder = new Order({
                title: args.title,
                products: args.products
            });

            return newOrder.save();
        }
    }
}