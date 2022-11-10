const express = require("express");
const router = express.Router();

const { uploadCategoryImage } = require("../controllers/upload");

router.post("/categories/:id", uploadCategoryImage);

module.exports = router;
