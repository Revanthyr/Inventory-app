const fetchCategory = require("../db/fetchCategory");

module.exports = function booksRouter(req, res) {
  fetchCategory("books").then((data) => res.render("books", { data }));
};
