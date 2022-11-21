const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryWithProductsByName,
} = require("../controllers/categories");
const allowRoles = require("../middleware/allowRoles");

const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, allowRoles("admin", "staff"), getAllCategories);
router.get("/:id", auth, allowRoles("admin", "staff"), getCategoryById);
router.get(
  "/find/:name",
  auth,
  allowRoles("admin", "staff"),
  getCategoryByName
);
router.post("/", auth, allowRoles("admin"), createCategory);
router.put("/:id", auth, allowRoles("admin"), updateCategory);
router.delete("/:id", auth, allowRoles("admin"), deleteCategory);

// Hiển thị Category với tất cả Product có trong Cate
router.get(
  "/search/:name",
  auth,
  allowRoles("admin", "staff"),
  getCategoryWithProductsByName
);

module.exports = router;
