var express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { findDocuments } = require("../helpers/MongoDbHelper");

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
router.get("/", function (req, res, next) {
  const aggregate = [
    lookupCategory,
    lookupSupplier,
    {
      $addFields: {
        category: { $first: "$category" },
        supplier: { $first: "$supplier" },
      },
    },
  ];

  findDocuments({ aggregate: aggregate }, "products")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.find().byFirstName(name);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const product = new Product(data);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Product.findByIdAndUpdate(id, data);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
