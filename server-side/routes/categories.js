const express = require("express");
const router = express.Router();

<<<<<<< Updated upstream
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
const auth = require('../middleware/auth');
=======
router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
>>>>>>> Stashed changes


router.get("/", auth, allowRoles("admin", "staff"), getAllCategories);
router.get("/v1", getAllCategories);
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
router.get("/v1/search", getCategoryWithProductsByName);

module.exports = router;
