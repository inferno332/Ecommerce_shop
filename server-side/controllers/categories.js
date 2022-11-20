const Category = require("../models/category");
const tryCatch = require("./utils/tryCatch");

const getAllCategories = tryCatch(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

const getCategoryById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  res.status(200).json(category);
});

const getCategoryByName = tryCatch(async (req, res) => {
  const { name } = req.params;
  const category = await Category.find().byName(name);
  res.status(200).json(category);
});

const createCategory = tryCatch(async (req, res) => {
  const data = req.body;
  const category = new Category(data);
  await category.save();
  res.status(200).json(category);
});

const updateCategory = tryCatch(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const category = await Category.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(category);
});

const deleteCategory = tryCatch(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  res.status(200).json(category);
});

// Hiển thị Category với tất cả Product có trong Cate
const getCategoryWithProductsByName = tryCatch(async (req, res) => {
  const { name } = req.params;
  const aggregate = [
    {
      $match: { name: name },
    },
    {
      $lookup: {
        from: "products",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$id", "$categoryId"] },
            },
          },
        ],
        as: "products",
      },
    },
  ];
  const category = await Category.aggregate(aggregate).sort("1");
  res.status(200).json(category);
});

module.exports = {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryWithProductsByName,
};
