const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const oderSchema = new Schema(
  {
    createdDate: { type: Date, required: true },
    shippedDate: { type: Date },
    status: { type: String, required: true },
    description: { type: String },
    shippingAddress: { type: String, required: true },
    paymentType: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: "customer" },
    employeeId: { type: Schema.Types.ObjectId, ref: "employee" },
    orderDetails:[{
      // orderID : {type: Schema.Types.ObjectId, ref: 'order'},
      productId : { type: Schema.Types.ObjectId, ref: 'product'},
      quantity : { type: Number},
      price : { type: Number},
      discount : { type: Number},
    }],
  },
);

const Order = model("Order", oderSchema);
module.exports = Order;
