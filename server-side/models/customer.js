const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lasttName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    address: { type: String, required: true },
    birthday: {type: Date},
  },
  {
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, "i") });
      },
    },
  }
);
const Customer = model("Supplier", customerSchema);
module.exports = Customer;