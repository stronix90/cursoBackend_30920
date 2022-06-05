const apiRouter = require("express").Router();

const {
    productsTest,
    requestSucessfull,
    requestError,
} = require("../controllers/apiController");

// PASSPORT
const passport = require("passport");

// ROUTES
apiRouter.get("/productos-test", productsTest);

apiRouter.post(
    "/login",
    passport.authenticate("login", { failWithError: true }),
    requestSucessfull,
    requestError
);

apiRouter.post(
    "/register",
    passport.authenticate("register", { failWithError: true }),
    requestSucessfull,
    requestError
);

module.exports = apiRouter;
