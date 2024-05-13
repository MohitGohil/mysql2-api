import { config as dotEnvConfig } from "dotenv";
import mysql from "mysql2";

dotEnvConfig();

// Define MySQL connection options based on environment
const dbConfig = {
  localDB: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB || "test",
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT || 3306,
  },
  docker_container: {
    host: process.env.MYSQL_HOST || "localhost", // This is the name of the MySQL service in the Docker network
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB || "test",
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT || 3306,
  },
};

// Determine the appropriate database configuration based on NODE_ENV
const environment = process.env.NODE_ENV || "development";
const defaultDbConfig = dbConfig[environment] || dbConfig.localDB;

// Create a MySQL pool with the selected configuration
const mySqlPool = mysql.createPool(defaultDbConfig);

// Function to connect to MySQL
const connectMySQL = async (dbName) => {
  try {
    const dbConfig = {
      ...defaultDbConfig,
      database: dbName || defaultDbConfig.database, // Overwrite database name if provided
    };
    await mySqlPool.promise().getConnection();
    console.log(`✅ Connected to MySQL - Database: ${dbConfig.database}`);
  } catch (err) {
    console.error(`MySQL Connection Error: ${err.message}`);
    // You may want to uncomment the following line to exit the process on connection failure.
    // process.exit(1);
  }
};

export { connectMySQL, mySqlPool };
