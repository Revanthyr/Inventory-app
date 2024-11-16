const formController = require("../controllers/formController");
const addItem = require("../controllers/addItem");
module.exports = function postAddRouter(req, res) {
  const { category } = req.params;

  formController(req, category, res);
  addItem(category, req.body);
  res.redirect(`/${category}`);
};
