const { Pool } = require("pg");
console.log({
  user: process.env.DATABASE_USER,

  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
});
const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: 5432,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;
