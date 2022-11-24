const Product = require("../models/product");
const tryCatch = require("./utils/tryCatch");

const getAllProducts = tryCatch(async (req, res) => {
  const lookupCategory = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  const lookupSupplier = {
    $lookup: {
      from: "suppliers",
      localField: "supplierId",
      foreignField: "_id",
      as: "supplier",
    },
  };
  const products = await Product.aggregate([
    lookupCategory,
    lookupSupplier,
    {
      $addFields: {
        category: { $first: "$category" },
        supplier: { $first: "$supplier" },
      },
    },
  ]);
  res.status(200).json(products);
});

const getProductById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
});

const getProductByName = tryCatch(async (req, res) => {
  const { name } = req.params;
  const product = await Product.find().byName(name);
  res.status(200).json(product);
});

const createProduct = tryCatch(async (req, res) => {
  const data = req.body;
  const product = new Product(data);
  await product.save();
  res.status(200).json(product);
});

const updateProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(product);
});

const deleteProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({ ok: true });
});

//Hiển thị tất cả mặt hàng có tồn kho dưới 50
const stockProduct = tryCatch(async (req, res) => {
  const result = await Product.find({ stock: { $lte: 50 } });
  res.status(200).json(result);
});

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  stockProduct,
};
