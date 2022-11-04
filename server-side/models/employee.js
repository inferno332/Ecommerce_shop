const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    address: { type: String, required: true },
    birthday: Date,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, "i") });
      },
    },
  }
);
const Employee = model("Employee", employeeSchema);
module.exports = Employee;
