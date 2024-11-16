const pool = require("../db/pool");
module.exports = async function getItem(item, category) {
  console.log("get item top level");
  if (!["authors", "books", "genres"].includes(category)) {
    return res.status(400).render("404");
  } else {
    if (category === "authors") {
      const data = await pool.query(
        "SELECT DISTINCT TO_CHAR(birth_date,'DD/MM/YYYY') AS birth_date,a.name,b.name AS title,b.id,b.author_id FROM authors a JOIN books b ON b.author_id = a.id WHERE a.id = ($1);",
        [item]
      );
      if (data.rows.length === 0) {
        const realData = await pool.query(
          "SELECT DISTINCT TO_CHAR(birth_date,'DD/MM/YYYY') AS birth_date,name,id AS author_id FROM authors WHERE id = ($1)",
          [item]
        );
        const { rows } = realData;
        return rows;
      }

      const { rows } = data;
      return rows;
    } else if (category === "books") {
      const data = await pool.query(
        "SELECT b.id,b.name, TO_CHAR(publish_date,'DD/MM/YYYY') AS publish_date,author_id,rating,description,a.name AS author,g.name AS genre FROM books b JOIN authors a ON b.author_id = a.id JOIN genres g  ON g.book_id = b.id  WHERE b.id = ($1);",
        [item]
      );
      const { rows } = data;
      console.log("get item finished querying");
      return rows;
    } else if (category === "genres") {
      const data = await pool.query(
        "SELECT b.id AS book_id ,g.id,g.name,b.name AS title FROM books b JOIN genres g ON g.book_id = b.id WHERE g.name = ($1);",
        [item]
      );

      if (data.rows.length === 0) {
        const realData = await pool.query(
          "SELECT DISTINCT name FROM genres WHERE name = ($1)",
          [item]
        );
        const { rows } = realData;

        return rows;
      }
      const { rows } = data;

      return rows;
    }
  }
};
