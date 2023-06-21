const { Schema, model, Types } = require("mongoose");
const schema = Schema({

    cartItems: [{
        product: {
            type: Types.ObjectId,
            ref: 'product'
        },
        quantity: Number,
        price: Number
    }],
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    paymentType:{
        type:String,
        enum:['cash','card'],
        default: 'cash'

    },
    orderPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number,
}, { timestamps: true });

module.exports = model("order", schema);
