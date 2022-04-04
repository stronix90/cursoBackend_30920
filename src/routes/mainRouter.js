const mainRouter = require("express").Router();

mainRouter.get("/", (req, res) => {
  res.render('home');
});

module.exports = mainRouter;
