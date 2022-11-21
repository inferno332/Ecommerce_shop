const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct,
  stockProduct,
} = require("../controllers/products");
const allowRoles = require("../middleware/allowRoles");

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, allowRoles("admin", "staff"), getAllProducts);
router.get("/:id", auth, allowRoles("admin", "staff"), getProductById);
router.get("/find/:name", auth, allowRoles("admin", "staff"), getProductByName);
router.post("/", auth, allowRoles("admin"), createProduct);
router.put("/:id", auth, allowRoles("admin"), updateProduct);
router.delete("/:id", auth, allowRoles("admin"), deleteProduct);

router.get("/stock/find", auth, allowRoles("admin", "staff"), stockProduct);

module.exports = router;
