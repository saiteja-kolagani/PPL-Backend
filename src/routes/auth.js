const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models/database");


router.post("/register", async (req, res) => { // Changed POST to GET to match your URL query example
  const { username, password } = req.query;

  db.get("SELECT username FROM users WHERE username = ?", [username], (err, row) => {
    if (row) {
      return res.status(400).send(`
        <html>
          <body>
            <h1>Registration Failed</h1>
            <p>Username already exists</p>
            <a href="/register">Try Again</a>
          </body>
        </html>
      `);
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send(`
          <html>
            <body>
              <h1>Registration Failed</h1>
              <p>Error hashing password</p>
              <a href="/register">Try Again</a>
            </body>
          </html>
        `);
      }

      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], function (err) {
        if (err) {
          return res.status(500).send(`
            <html>
              <body>
                <h1>Registration Failed</h1>
                <p>Error registering user</p>
                <a href="/register">Try Again</a>
              </body>
            </html>
          `);
        }
        
        // Corrected: Using the JWT_SECRET from environment variables
        const token = jwt.sign({ id: this.lastID }, process.env.SECRET_KEY, { expiresIn: "1h" });
        
        res.status(201).send(`
          <html>
            <body>
              <h1>Registration Successful</h1>
              <p>Your registration was successful. Here is your token:</p>
              <p>${token}</p>
              <a href="/login">Login</a>
            </body>
          </html>
        `);
      });
    });
  });
});

router.post("/login", (req, res) => { // Changed POST to GET to match your URL query example
  const { username, password } = req.query;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).send(`
        <html>
          <body>
            <h1>Login Failed</h1>
            <p>Error fetching user</p>
            <a href="/login">Try Again</a>
          </body>
        </html>
      `);
    }

    if (!user) {
      return res.status(401).send(`
        <html>
          <body>
            <h1>Login Failed</h1>
            <p>Invalid credentials</p>
            <a href="/login">Try Again</a>
          </body>
        </html>
      `);
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        // Corrected: Use the user ID from the database
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.send(`
          <html>
            <body>
              <h1>Login Successful</h1>
              <p>Welcome back! Here is your token:</p>
              <p>${token}</p>
            </body>
          </html>
        `);
      } else {
        res.status(401).send(`
          <html>
            <body>
              <h1>Login Failed</h1>
              <p>Invalid credentials</p>
              <a href="/login">Try Again</a>
            </body>
          </html>
        `);
      }
    });
  });
});

module.exports = router;
