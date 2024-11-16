const fetchCategory = require("../db/fetchCategory");

module.exports = function authorsRouter(req, res) {
  fetchCategory("authors").then((data) => res.render("authors", { data }));
};
