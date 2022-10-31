const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: String,
    description: String,
  },
  {
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, "i") });
      },
    },
  }
);

const Category = model("Category", categorySchema);
module.exports = Category;
