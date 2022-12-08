const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const oderSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: String,
        address: { type: String, required: true },
        birthday: Date,

        shippedDate: { type: Date },
        status: { type: String, default: 'waiting' },
        description: { type: String },
        shippingAddress: { type: String, required: true },
        paymentType: { type: String, default: 'CASH' },
        orderDetails: [
            {
                // productId: { type: Schema.Types.ObjectId, ref: 'product' },
                name: {type: String},
                price: { type: Number },
                quantity: { type: Number },
                // discount: { type: Number },
            },
            { _id: false },
        ],
    },
    { timestamps: { updatedAt: false } },
);

const Order = model('Order', oderSchema);
module.exports = Order;
