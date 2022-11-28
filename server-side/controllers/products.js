const Product = require("../models/product");
const tryCatch = require("./utils/tryCatch");

const getAllProducts = tryCatch(async (req, res) => {
  const page = req.query.page;
  const productsPerPage = 12;

  if (page) {
    const products = await Product.find()
      .skip(page * productsPerPage)
      .limit(productsPerPage)
      .populate("categoryId")
      .populate("supplierId");
    res.status(200).json(products);
  } else {
    const products = await Product.find()
      .populate("categoryId")
      .populate("supplierId");
    res.status(200).json(products);
  }
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

const searchProductByCategory = tryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.query;
  const result = await Product.find({
    $and: [{ categoryId: categoryId }, { name: new RegExp(name, "i") }],
  });
  res.status(200).json(result);
});

const filterProduct = tryCatch(async (req, res) => {
  const { w, m, a } = req.query;

  const result = await Product.find({
    $and: [
      
    ],
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  stockProduct,
  searchProductByCategory,
  filterProduct,
};
