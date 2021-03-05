const Order = require('../../models/orderModel');

module.exports = {
    Query: {
        orders: () => {
            Order.find()
            .populate('products').populate('user')
        },
        order: (parent, args) => {
            Order.findById(args.id);
        }
    },
    Mutation: {
        createOrder: (parent, args) => {
            const orderNew = new Order ({
                totalAmount: args.totalAmount,
                user: args.user,
                products: args.products,
            });
            return orderNew.save();
        },
        updateOrder: (parent, args) => {
            const orderUpdate = new Order ({
                totalAmount: args.totalAmount,
                user: args.user,
                products: args.products,
            });
            return orderNew.save();
        },
        deleteOrder: (parent, args) => {
            const orderNew = new Order ({
                totalAmount: args.totalAmount,
                user: args.user,
                products: args.products,
            });
            return orderNew.save();
        }
    }
}