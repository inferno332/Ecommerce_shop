const express = require("express");
const router = express.Router();

const {
  uploadMultipleImage,
  uploadSingleImage,
} = require("../controllers/upload");

router.post("/multiple/:id", uploadMultipleImage);
router.post("/single/:id", uploadSingleImage);

module.exports = router;
