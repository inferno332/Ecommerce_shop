const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplier");
const passport = require("passport");
const allowRoles = require("./middlewareAllowRoles");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.status(200).json(suppliers);
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
      const supplier = await Supplier.findById(id);
      res.status(200).json(supplier);
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
      const supplier = await Supplier.find().byName(name);
      res.status(200).json(supplier);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const data = req.body;
      const supplier = new Supplier(data);
      await supplier.save();
      res.status(200).json(supplier);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await Supplier.findByIdAndUpdate(id, data);
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
      await Supplier.findByIdAndDelete(id);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
