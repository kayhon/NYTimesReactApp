const router = require("express").Router();

const articlesController = require("../../controllers/Articles");

// Matches with "/api/articles"
router

  .route("/")
  .get(articlesController.get)
  .post(articlesController.create)
  .delete(articlesController.delete);

module.exports = router;

// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

// module.exports = router;
