const router = require("express").Router();
const articlesRoutes = require("./articles");

// article routes
router.use("/articles", articlesRoutes);

module.exports = router;
