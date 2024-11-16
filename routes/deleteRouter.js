const deleteAuthor = require("../controllers/deleteAuthor");
const deleteBook = require("../controllers/deleteBook");
const deleteGenre = require("../controllers/deleteGenre");

module.exports = async function deleteRouter(req, res) {
  const { category } = req.params;
  const { item } = req.params;
  if (category === "books") {
    await deleteBook(item);
    res.redirect("/books");
  } else if (category === "authors") {
    await deleteAuthor(item);
    res.redirect("/authors");
  } else if (category === "genres") {
    await deleteGenre(item);
    res.redirect("/genres");
  }
};
