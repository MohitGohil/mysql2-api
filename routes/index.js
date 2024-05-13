import { Router } from "express";
import MySqlApiController from "../controllers/index.js";

const mySqlApiController = new MySqlApiController();
const mySqlApiRoute = Router();

mySqlApiRoute.get("/", (req, res) => {
  res.json({ message: "Welcome to mySqlApi" });
});
mySqlApiRoute.get("/employees", mySqlApiController.getEmployees);
mySqlApiRoute.get("/employees/:id", mySqlApiController.getEmployeeById);
mySqlApiRoute.post("/employees", mySqlApiController.createEmployee);
mySqlApiRoute.put("/employees/:id", mySqlApiController.updateEmployee);
mySqlApiRoute.delete("/employees/:id", mySqlApiController.deleteEmployee);

export default mySqlApiRoute;
