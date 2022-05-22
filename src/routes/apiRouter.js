const { productsTest, login } = require("../controllers/apiController");

const apiRouter = require("express").Router();

apiRouter.get("/productos-test", productsTest);
apiRouter.get("/login", login);

module.exports = apiRouter;
