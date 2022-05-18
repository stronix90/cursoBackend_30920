const { productsTest } = require("../controllers/apiController");

const apiRouter = require("express").Router();

apiRouter.get("/productos-test", productsTest);

module.exports = apiRouter;
