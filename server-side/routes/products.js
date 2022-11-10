var express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const allowRoles = require("../middleware/allowRoles");
const auth = require("../middleware/auth");

router.get("/", auth, allowRoles("admin", "staff"), getAllProducts);
router.get("/:id", auth, allowRoles("admin", "staff"), getProductById);
router.get("/find/:name", auth, allowRoles("admin", "staff"), getProductByName);
router.post("/", auth, allowRoles("admin"), createProduct);
router.put("/:id", auth, allowRoles("admin"), updateProduct);
router.delete("/:id", auth, allowRoles("admin"), deleteProduct);

module.exports = router;
