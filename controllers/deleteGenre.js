const pool = require("../db/pool");

module.exports = async function deleteGenre(name) {
  await pool.query("DELETE FROM genres WHERE name = ($1) ", [name]);
};
