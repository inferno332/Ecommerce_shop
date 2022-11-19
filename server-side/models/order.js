const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const oderSchema = new Schema(
  {
    shippedDate: { type: Date },
    status: { type: String, default: "waiting" },
    description: { type: String },
    shippingAddress: { type: String, required: true },
    paymentType: { type: String, default: "cash" },
    customerId: { type: Schema.Types.ObjectId, ref: "customer" },
    employeeId: { type: Schema.Types.ObjectId, ref: "employee" },
    orderDetails: [
      {
        // orderID : {type: Schema.Types.ObjectId, ref: 'order'},
        productId: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number },
        price: { type: Number },
        discount: { type: Number },
      },
    ],
  },
  { timestamps: { updatedAt: false } }
);

const Order = model("Order", oderSchema);
module.exports = Order;
