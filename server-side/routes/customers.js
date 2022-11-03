const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const customer = await Customer.find().byFirstName(name);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const customer = new Customer(data);
    await customer.save();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Customer.findByIdAndUpdate(id, data);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
