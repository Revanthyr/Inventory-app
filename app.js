const express = require("express");
require("dotenv").config();
const app = express();
const path = require("node:path");
const getCategory = require("./controllers/getCategory");
const authorsRouter = require("./routes/authorsRouter");
const booksRouter = require("./routes/booksRouter");
const genresRouter = require("./routes/genresRouter");
const itemRouter = require("./routes/itemRouter");
const addRouter = require("./routes/addRouter.js");
const postAddRouter = require("./routes/postAddRouter.js");
const editRouter = require("./routes/editRouter");
const deleteRouter = require("./routes/deleteRouter.js");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.render("index"));
app.get("/edit/:category/:item", editRouter);
app.get("/authors", authorsRouter);
app.get("/books", booksRouter);
app.get("/genres", genresRouter);
app.get("/:category/add", addRouter);
app.get("/:category/:item", itemRouter);
app.post("/:category/add", postAddRouter);
app.post("/:category/update", editRouter);
app.post("/:category/delete/:item", deleteRouter);

const PORT = parseInt(process.env.PORT);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
