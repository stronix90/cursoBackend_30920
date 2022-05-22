const express = require("express");

// General
const path = require("path");
const morgan = require("morgan");

// socket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

// Handlebars
const { engine } = require("express-handlebars");

// Dependencias
const { messagesDao } = require("./daos/index");

// Router
const apiRouter = require("./routes/apiRouter");
const renderRouter = require("./routes/renderRouter");

// Session
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// -------------------------------------------------------------------------

// Application
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Settings
app.set("port", 8080);

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://desafioCoder:desafioCoder@cluster0.t7sf8.mongodb.net/session?retryWrites=true&w=majority",
            mongoOptions: advancedOptions,
        }),
        secret: "fraseSecretaSt",
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 1 }, // 1 seg * Segundos * Minutos
    })
);

// PAGES
app.use("/api", apiRouter);
app.use("/", renderRouter);

// ------------------------------------------------------------------------

// SOCKET
let msgArray;
messagesDao.findAll().then((res) => {
    msgArray = res;
});

io.on("connection", async (socket) => {
    // MENSAJES
    socket.on("getMessages", () => {
        const normalizedMessages = messagesDao.normalizeMessages(msgArray);
        socket.emit("inicioMsg", normalizedMessages);
    });

    socket.on("newMessage", async (newMsg) => {
        io.sockets.emit("newMessage", newMsg);

        const newMsgWithId = await messagesDao.save(newMsg);
        msgArray.push(newMsgWithId);
    });
});

module.exports = { httpServer, app };
