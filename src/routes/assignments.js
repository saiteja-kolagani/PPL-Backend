const express = require("express");
const router = express.Router();
const db = require("../models/database");
const authenticateToken = require("../middleware/authenticateToken");

// GET all assignments
router.get("/", authenticateToken, (req, res) => {
  db.all("SELECT * FROM assignments", [], (err, rows) => {
    if (err) {
      return res.status(500).send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>${err.message}</p>
                        <a href="/assignments">Go Back</a>
                    </body>
                </html>
            `);
    }
    res.send(`
        <html>
            <body>
                <h1>Assignments</h1>
                <ul>
                    ${rows.map((row) => `
                        <li>${row.title}: ${row.description}</li>
                    `).join(" ")}
                </ul>
            </body>
        </html>
    `);
  });
});

// POST a new assignment
router.post("/", authenticateToken, (req, res) => {
  const {title, description} = req.query;
  const sql = "INSERT INTO assignments (title, description) VALUES (?, ?)";
  const params = [title, description];
  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>${err.message}</p>
                        <a href="/assignments">Try Again</a>
                    </body>
                </html>
            `);
    }
    res.send(`
            <html>
                <body>
                    <h1>Success</h1>
                    <p>Assignment Created with ID: ${this.lastID}</p>
                    <a href="/assignments">View All Assignments</a>
                </body>
            </html>
        `);
  });
});

// PUT update an assignment
router.put("/:id", authenticateToken, (req, res) => {
  const {title, description} = req.query;
  const {id} = req.params;
  const sql = "UPDATE assignments SET title = ?, description = ? WHERE id = ?";
  const params = [title, description, id];
  db.run(sql, params, (err) => {
    if (err) {
      return res.status(500).send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>${err.message}</p>
                        <a href="/assignments">Try Again</a>
                    </body>
                </html>
            `);
    }
    res.send(`
            <html>
                <body>
                    <h1>Success</h1>
                    <p>Assignment Updated</p>
                    <a href="/assignments">View All Assignments</a>
                </body>
            </html>
        `);
  });
});

// DELETE an assignment
router.delete("/:id", authenticateToken, (req, res) => {
  const {id} = req.params;
  const sql = "DELETE FROM assignments WHERE id = ?";
  db.run(sql, id, (err) =>{
    if (err) {
      return res.status(500).send(`
                <html>
                    <body>
                        <h1>Error</h1>
                        <p>${err.message}</p>
                        <a href="/assignments">Try Again</a>
                    </body>
                </html>
            `);
    }
    res.send(`
            <html>
                <body>
                    <h1>Success</h1>
                    <p>Assignment Deleted</p>
                    <a href="/assignments">View All Assignments</a>
                </body>
            </html>
        `);
  });
});

module.exports = router;
