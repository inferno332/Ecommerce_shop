const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    address: { type: String, required: true },
    birthday: Date,
  },
  {
    query: {
      byFirstName(name) {
        return this.where({ firstName: new RegExp(name, "i") });
      },
    },
  }
);
const Employee = model("Employee", employeeSchema);
module.exports = Employee;
