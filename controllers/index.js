import { mySqlPool } from "../config/index.js";

// Define MySQL queries
const queries = {
  getAllEmployees: "SELECT * FROM employees",
  getEmployeeById: "SELECT * FROM employees WHERE employee_id = ?",
  createNewEmployee:
    "INSERT INTO employees (first_name, last_name, job_title, salary, reports_to, office_id) VALUES (?, ?, ?, ?, ?, ?)",
  updateEmployeeById:
    "UPDATE employees SET first_name = ?, last_name = ?, job_title = ?, salary = ?, reports_to = ?, office_id = ? WHERE employee_id = ?",
  deleteEmployeeById: "DELETE FROM employees WHERE employee_id = ?",
};

class MySqlApiController {
  async getEmployees(req, res) {
    try {
      const [rows, fields] = await mySqlPool.promise().execute(queries.getAllEmployees);
      res.status(200).json({ result: rows });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const [rows, fields] = await mySqlPool.promise().execute(queries.getEmployeeById, [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.json({ result: rows[0] });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async createEmployee(req, res) {
    try {
      const { first_name, last_name, job_title, salary, reports_to, office_id } = req.body;
      const [result] = await mySqlPool
        .promise()
        .execute(queries.createNewEmployee, [
          first_name,
          last_name,
          job_title,
          salary,
          reports_to,
          office_id,
        ]);
      res.status(201).json({ message: "Employee created successfully", result: result });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async updateEmployee(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { first_name, last_name, job_title, salary, reports_to, office_id } = req.body;
      const [result] = await mySqlPool
        .promise()
        .execute(queries.updateEmployeeById, [
          first_name,
          last_name,
          job_title,
          salary,
          reports_to,
          office_id,
          id,
        ]);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.json({ message: "Employee updated successfully", result: result });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const id = parseInt(req.params.id);
      const [result] = await mySqlPool.promise().execute(queries.deleteEmployeeById, [id]);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.json({ message: "Employee deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

export default MySqlApiController;
