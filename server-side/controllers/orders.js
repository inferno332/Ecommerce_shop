const Order = require("../models/order");
const tryCatch = require("./utils/tryCatch");

const getAllOrders = tryCatch(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

const getOrderById = tryCatch(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  res.status(200).json(order);
});

const getOrderByName = tryCatch(async (req, res) => {
  const { name } = req.params;
  const order = await Order.find().byFirstName(name);
  res.status(200).json(order);
});

const createOrder = tryCatch(async (req, res) => {
  const data = req.body;
  const order = new Order(data);
  await order.save();
  res.status(200).json(order);
});

const updateOrder = tryCatch(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await Order.findByIdAndUpdate(id, data);
  res.status(200).json({ ok: true });
});

const deleteOrder = tryCatch(async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndDelete(id);
  res.status(200).json({ ok: true });
});

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByName,
  createOrder,
  updateOrder,
  deleteOrder,
};
