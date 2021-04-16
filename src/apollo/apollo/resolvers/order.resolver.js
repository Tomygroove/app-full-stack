const Order = require('../../models/order.model')

module.exports = {
    
    Query: {
        
        orders: () => {
            return Order.find()
            .populate('products').populate('user')
        },
        order: (parent, args) => {
            console.log(args.id)
            return Order.findById(args.id).populate('products').populate('user')
        }
    },
    Mutation: {
        createProduct: (parent, args) => {
            const newOrder = new Order({
                amountTotal: args.amountTotal,
                user: args.user,
                products: args.products
            });

            return newOrder.save();
        }
    }
}