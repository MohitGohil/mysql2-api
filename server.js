import { config as dotEnvConfig } from "dotenv";
import express from "express";
import { createServer } from "http";
import helmet from "helmet";
import { connectMySQL } from "./config/index.js";
import mySqlApiRoute from "./routes/index.js";

const app = express();
const server = createServer(app);

dotEnvConfig();
const PORT = process.env.PORT || "8000";

connectMySQL();

app.use(helmet());
app.use("/mysql", mySqlApiRoute);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
