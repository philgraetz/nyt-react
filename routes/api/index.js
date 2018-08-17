const router = require("express").Router();
const articleRoutes = require("./articles");
const nytRoutes = require("./nyt");

// Article routes
router.use("/articles", articleRoutes);

// nyt routes
router.use("/nyt", nytRoutes);

module.exports = router;