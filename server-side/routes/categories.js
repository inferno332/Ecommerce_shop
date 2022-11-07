const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const passport = require("passport");
const allowRoles = require("./middlewareAllowRoles");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  allowRoles("admin", "staff"),
  async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
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
      const category = await Category.findById(id);
      res.status(200).json(category);
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
      const category = await Category.find().byName(name);
      res.status(200).json(category);
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
      const category = new Category(data);
      await category.save();
      res.status(200).json(category);
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
      await Category.findByIdAndUpdate(id, data);
      res.status(200).json({ ok: true, data });
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
      await Category.findByIdAndDelete(id);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
