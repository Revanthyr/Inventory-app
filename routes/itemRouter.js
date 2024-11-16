const getItem = require("../controllers/getItem");
module.exports = async function itemRouter(req, res) {
  const item = req.params.item;
  const category = req.params.category;
  if (isNaN(item) && category !== "genres") {
    return res.status(400).send("Invalid item ID");
  }
  console.log(item, "ITEEEMS", category);
  const data = await getItem(item, category);
  console.log(data);
  res.render(`${category}Item`, { data });
};
