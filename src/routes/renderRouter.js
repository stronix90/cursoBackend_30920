const renderRouter = require("express").Router();
const { auth } = require("../middlewares/auth");

renderRouter.get("/", auth, (req, res) => {
    const name = req.session.name;

    res.render("home", { name });
});

renderRouter.get("/login", (req, res) => {
    if (req.session.name) res.redirect("/");
    else res.render("login");
});

renderRouter.get("/logout", auth, async (req, res) => {
    const name = req.session.name;

    await req.session.destroy();
    res.render("logout", { name });
});

module.exports = renderRouter;
