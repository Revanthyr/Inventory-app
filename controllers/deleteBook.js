const pool = require("../db/pool");

module.exports = async function deleteBook(id) {
  await pool.query("DELETE FROM books WHERE id=($1)", [id]);
  await pool.query("DELETE FROM genres WHERE book_id = ($1)", [id]);
};
