const { Articles } = require("../models");

module.exports = {
  get: (req, res) =>
    Articles.find()
      .sort({ published: -1 })
      .then(articles => res.json(articles))
      .catch(err => res.status(422).json(err.errormsg)),
  create: (req, res) =>
    Articles.create(req.body)
      .then(article => res.json(article))
      .catch(err => res.status(422).json(err.errormsg)),
  delete: (req, res) =>
    Articles.remove({ _id: req.body._id })
      .then(msg => res.json(msg))
      .catch(err => res.status(422).json(err.errormsg))
};

// const db = require("../models");

// // Defining methods for the booksController
// module.exports = {
//   findAll: function(req, res) {
//     db.Book
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
// };

