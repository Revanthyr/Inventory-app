const getCategories = require("../controllers/getCategories");

module.exports = function addRouter(req, res) {
  const { category } = req.params;
  getCategories().then((data) => {
    res.render(`Add${category}`, { data });
  });
};
