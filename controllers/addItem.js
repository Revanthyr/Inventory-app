const pool = require("../db/pool");
module.exports = async function addItem(category, body) {
  if (category === "books") {
    const authorData = await pool.query(
      "SELECT id FROM authors WHERE name = ($1);",
      [body.author]
    );
    const author = authorData.rows[0].id;

    await pool.query(
      "INSERT INTO books (name,publish_date,author_id,rating,description) VALUES(($1),($2),($3),($4),($5));",
      [
        body.name,
        body.publish_date !== "" ? body.publish_date : null,
        author,
        body.rating !== "" ? body.rating : null,
        body.description,
      ]
    );
    const id = await pool.query("SELECT id FROM books WHERE name = ($1);", [
      body.name,
    ]);
    const { rows } = id;

    await pool.query("INSERT INTO genres (name,book_id) VALUES (($1),($2)); ", [
      body.genre,
      rows[0].id,
    ]);
  } else if (category === "authors") {
    await pool.query(
      "INSERT into authors (name,birth_date) VALUES (($1),($2));",
      [body.name, body.birth_date !== "" ? body.birth_date : null]
    );
  } else if (category === "genres") {
    await pool.query("INSERT INTO genres (name) VALUES (($1));", [body.name]);
  }
};
