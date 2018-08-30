const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  headline: { type: String, required: true },
  byline: String,
  published: { type: Date, required: true },
  url: { type: String, required: true, unique: true }
});

const Articles = mongoose.model("Articles", userSchema, "articles");

module.exports = Articles;

// const bookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   synopsis: String,
//   date: { type: Date, default: Date.now }
// });

// const Book = mongoose.model("Book", bookSchema);
