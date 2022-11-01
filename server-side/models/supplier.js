const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supplierSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: String,
    address: { type: String, required: true },
  },
  {
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, "i") });
      },
    },
  }
);
const Supplier = model("Supplier", supplierSchema);
module.exports = Supplier;