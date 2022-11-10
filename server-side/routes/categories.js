const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const allowRoles = require("../middleware/allowRoles");
const auth = require("../middleware/auth");

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

module.exports = router;
