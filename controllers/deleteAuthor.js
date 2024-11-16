const pool = require("../db/pool");

module.exports = async function deleteAuthor(id) {
  await pool.query("DELETE FROM authors WHERE id = ($1)", [id]);
};
