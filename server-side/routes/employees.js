const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const passport = require("passport");
const allowRoles = require("../middleware/allowRoles");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get(
  "/find/:name",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const { name } = req.params;
      const employee = await Employee.find().byFullName(name);
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await Employee.findByIdAndUpdate(id, data);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      await Employee.findByIdAndDelete(id);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
