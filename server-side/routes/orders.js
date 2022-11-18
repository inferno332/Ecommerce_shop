const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getSoldOrder,
} = require("../controllers/orders");
const allowRoles = require("../middleware/allowRoles");
const auth = require("../middleware/auth");

router.get("/", auth, allowRoles("admin", "staff"), getAllOrders);
router.get("/:id", auth, allowRoles("admin", "staff"), getOrderById);
router.post("/", auth, allowRoles("admin"), createOrder);
router.put("/:id", auth, allowRoles("admin"), updateOrder);
router.delete("/:id", auth, allowRoles("admin"), deleteOrder);

//Hiển thị tất cả các mặt hàng được bán trong hôm nay
router.get("/search/sold", auth, allowRoles("admin", "staff"), getSoldOrder);

module.exports = router;
