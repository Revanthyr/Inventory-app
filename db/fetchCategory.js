const pool = require("./pool.js");

module.exports = async function fetchCategory(category) {
  if (category === "authors") {
    const { rows } = await pool.query("SELECT DISTINCT name,id FROM authors;");
    return rows;
  } else if (category === "books") {
    const { rows } = await pool.query(
      " SELECT x.name AS title, TO_CHAR(publish_date,'DD/MM/YYYY') AS publish_date,y.name,rating,x.id FROM books x JOIN authors y ON x.author_id = y.id;"
    );

    return rows;
  } else if (category === "genres") {
    const { rows } = await pool.query("SELECT DISTINCT name FROM genres;");

    return rows;
  }
};
