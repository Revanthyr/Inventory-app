const { body, validationResult } = require("express-validator");

module.exports = function formController(req, category, res) {
  if (category === "authors") {
    body("name").isString().withMessage("Come on...");
    body("birth_date").optional().isDate();
  } else if (category === "books") {
    body("name").isString().withMessage("Come on...");
    body("publish_date").optional().isDate();
    body("author").isString().withMessage("Look up the author!");
    body("genre")
      .isString()
      .withMessage("If you don't know the genre just make something up");
    body("rating").isFloat({ min: 1, max: 5 });
  } else if (category === "genres") {
    body("name").isString();
  }
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render(`Add${category}`, { error: result.array() });
  }
};
