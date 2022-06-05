const renderRouter = require("express").Router();
const { usersDao } = require("../daos/index");
const { isAuth } = require("../middleware/auth");

renderRouter.get("/", isAuth, async (req, res) => {
    const user = req.user;

    res.render("home", { user });
});

renderRouter.get("/signup", (req, res) => {
    res.render("register");
});

renderRouter.get("/login", (req, res) => {
    if (req.session.name) res.redirect("/");
    else res.render("login");
});

renderRouter.get("/logout", isAuth, async (req, res) => {
    const name = req.user.name;

    await req.session.destroy();
    res.render("logout", { name });
});

module.exports = renderRouter;
