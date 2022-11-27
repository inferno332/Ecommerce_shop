const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount:{ type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    description: { type: String, required: true },
    imageURL: {type: Array, default: []},
  },
  {
    query: {
      byName(name) {
        return this.where({ name: new RegExp(name, 'i') });
      },
    },
  },
);

const Product = model('Product', productSchema);
module.exports = Product;