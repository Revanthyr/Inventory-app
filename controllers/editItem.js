const pool = require("../db/pool");

module.exports = async function editItem(category, body) {
  console.log("edit item toplevel");
  if (category === "authors") {
    await pool.query(
      "UPDATE authors SET name=($1), birth_date = ($2) WHERE id=($3)",
      [body.name, body.birth_date, body.id]
    );
  } else if (category === "books") {
    console.log(body, "body here");
    await pool.query(
      "UPDATE books SET name = ($1), publish_date = ($2), rating = ($3),description = ($4) WHERE id=($5)",
      [body.name, body.publish_date, body.rating, body.description, body.id]
    );
    console.log("finished runnign query");
  } else if (category === "genres") {
    console.log(body, "body for genres");

    await pool.query("UPDATE genres SET name = ($1) WHERE name = ($2)", [
      body.name,
      body.id,
    ]);
  }
};
