const { Pool } = require("pg");

// TODO: Replace with dotenv
const pool = new Pool({
  user: "postgres",
  password: process.env.DBPASSWORD,
  host: "localhost",
  port: 5432,
  database: "inventory_app",
});
module.exports = pool;
