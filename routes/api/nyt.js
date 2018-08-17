const router = require("express").Router();
const nytController = require("../../controllers/nytController");

// Matches with "/api/nyt"
router.route("/")
  .get(nytController.fetch)

module.exports = router;
