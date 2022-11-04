const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const jwtSettings = require("../constants/jwtSettings");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const employee = new Employee(data);

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(employee.password, salt);

    await employee.save();
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const employee = await Employee.findOne({ username });
    if (employee) {
      // check employee password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, employee.password);
      if (validPassword) {
        const payload = {
          id: employee._id,
          username: employee.username,
        };

        const token = jwt.sign(payload, jwtSettings.SECRET, {
          expiresIn: 86400, // TOKEN WILL EXIST IN 24 hours
          algorithm: "HS512",
        });

        res.status(200).json({
          ok: true,
          login: true,
          token: token,
          payload,
        });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
