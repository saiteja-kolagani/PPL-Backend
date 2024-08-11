const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models/database");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT username FROM users WHERE username = ?", [username], (err, row) => {
    if (row) {
      return res.status(400).json({
        message: "Registration Failed: Username already exists"
      });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "Registration Failed: Error hashing password"
        });
      }

      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], function (err) {
        if (err) {
          return res.status(500).json({
            message: "Registration Failed: Error registering user"
          });
        }
        
        const token = jwt.sign({ id: this.lastID }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        res.status(201).json({
          message: "Registration Successful",
          token: token
        });
      });
    });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Login Failed: Error fetching user"
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Login Failed: Invalid credentials"
      });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({
          message: "Login Successful",
          token: token
        });
      } else {
        res.status(401).json({
          message: "Login Failed: Invalid credentials"
        });
      }
    });
  });
});

module.exports = router;
