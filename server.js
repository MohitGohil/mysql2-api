require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const helmet = require("helmet");
const app = express();
const server = createServer(app);
const { pool } = require("./config/mySql");

const PORT = process.env.PORT || "8000";

app.use(helmet());

app.get("/", async (req, res) => {
  // For pool initialization, see above
  const [rows, fields] = await pool.query("SELECT * FROM employees where employee_id=?", ["33391"]);
  // Connection is automatically released when query resolves
  res.json({ message: "Hi from server", rows, fields });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
