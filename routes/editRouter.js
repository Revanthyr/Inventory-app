const getItem = require("../controllers/getItem");
const editItem = require("../controllers/editItem");
module.exports = function editRouter(req, res) {
  const { item } = req.params;
  console.log("top level editrouter");
  const { category } = req.params;
  console.log("EDIT ROUTER ITEM", item);
  if (item === undefined) {
    console.log("calling the edititem function");
    editItem(category, req.body).then(() => {
      console.log("Redirecting...");
      console.log(category);
      res.redirect(`/${category}`);
    });
  } else {
    console.log("running other clauses");
    let fetchedItem;
    getItem(item, category).then((dataz) => {
      if (category === "genres") {
        fetchedItem = dataz[0].name;

        res.render(`Add${category}`, { fetchedItem, update: true });
      } else if (category === "authors") {
        fetchedItem = dataz[0];

        res.render(`Add${category}`, { fetchedItem, update: true });
      } else if (category === "books") {
        console.log("running with books cat");
        fetchedItem = dataz[0];
        console.log(dataz, "getitem sent this");
        let date;
        if (fetchedItem.publish_date == null) {
          date = null;
        } else {
          date = fetchedItem.publish_date.split("/").reverse().join("-");
        }
        console.log("about  to render update form");
        res.render(`Add${category}`, { fetchedItem, date, update: true });
      }
    });
  }
};
