const pool = require("../db/pool");

module.exports = async function getCategories() {
  const authors = await pool.query("SELECT DISTINCT name FROM authors;");
  const genres = await pool.query("SELECT DISTINCT name FROM genres;");
  const Authors = authors.rows;
  const Genres = genres.rows;
  return { Authors, Genres };
};
