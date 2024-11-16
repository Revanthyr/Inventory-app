const fetchCategory = require("../db/fetchCategory");

module.exports = function genresRouter(req, res) {
  fetchCategory("genres").then((data) => res.render("genres", { data }));
};
