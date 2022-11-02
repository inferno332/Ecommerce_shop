const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const employee = await Employee.find().byName(name);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const employee = new Employee(data);
    await employee.save();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await Employee.findByIdAndUpdate(id, data);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;