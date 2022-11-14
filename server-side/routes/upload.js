const express = require("express");
const router = express.Router();

const {
  uploadProductImage,
  uploadCategoryImage,
} = require("../controllers/upload");

router.post("/category/:id", uploadCategoryImage);
router.post("/product/:id", uploadProductImage);

module.exports = router;
