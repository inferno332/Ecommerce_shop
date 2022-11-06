var express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { findDocuments } = require("../helpers/MongoDbHelper");

const COLLECTION_NAME = 'orders';





router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  });
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get("/find/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const order = await Order.find().byFirstName(name);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const order = new Order(data);
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await Order.findByIdAndUpdate(id, data);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Order.findByIdAndDelete(id);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

module.exports = router;