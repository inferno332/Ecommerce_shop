const express = require("express");
const router = express.Router();

const {
  // uploadMultipleImage,
  // uploadSingleImage,
  uploadImage
} = require("../controllers/upload");

// router.post("/multiple/:id", uploadMultipleImage);
// router.post("/single/:id", uploadSingleImage);
router.post("/upload", uploadImage);
router.post("/upload/:id", uploadImage);

module.exports = router;
