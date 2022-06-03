const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const { usersDao } = require("./src/daos/index");

const usuarios = [
    {
        email: "Brian",
        password: "123",
        direccion: "French",
    },
];

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            let user = await usersDao.checkUser(email);
            user = user[0]._doc;

            if (!user || user.password != password) return done(null, false);


            const usuario = usuarios.find((usuario) => usuario.email == email);

            if (usuario) {
                return done("already registered");
            }

            const newUser = {
                email,
                password,
                direccion,
            };
            usuarios.push(user);

            return done(null, user);
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            let user = await usersDao.checkUser(email);
            user = user[0]._doc;

            if (!user || user.password != password) return done(null, false);

            return done(null, { email: "Brian", password: "123" });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    const usuario = usuarios.find((usuario) => usuario.email == email);
    done(null, usuario);
});

// SERVER

const app = express();

// MIDDLEWARE

app.use(
    session({
        secret: "hola",
        resave: false,
        cookie: {
            maxAge: 60000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", ".hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// AUTH

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

// ROUTES

// Register
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "views/register.html");
});

app.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/failregister",
        successRedirect: "/",
    })
);

app.get("/failregister", (req, res) => {
    res.json({ Error: "No se puede registrar" });
});

// Login
app.get("/login", (req, res) => {
    res.session(__dirname + "/views/login.html");
});

app.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/faillogin",
        successRedirect: "/datos",
    })
);

app.get("/faillogin", (req, res) => {
    res.json({ error: "Se produjo un error al loguearse" });
});

// Datos
app.get("/datos", isAuth, (req, res) => {
    console.log(req.user);
    res.json({ exito: "Entró a la página" });
});

// Logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// Inicio
app.get("/", isAuth, (req, res) => {
    console.log("Se registró");
    res.redirect("/datos");
});

// LISTEN
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el pueto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor: ${error}`));
