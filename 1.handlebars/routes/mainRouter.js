const mainRouter = require("express").Router();

const home = require("../controllers/mainController");

mainRouter.get("/", home);

module.exports = mainRouter;
