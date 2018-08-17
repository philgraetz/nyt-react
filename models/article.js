const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title : { type: String, required: true },
  url   : { type: String, required: true },
  date  : { type: Date, default: 0 },
  byline: { type: String, default: "" },
  image : { type: String, requred: false },
  saved : { type: Boolean, default: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
