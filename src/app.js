const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");

const { messagesDao } = require("./daos/index");

const apiRouter = require("./routes/apiRouter");

// Define application
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

// Router
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/api", apiRouter);

// ---------------------------------------------------------------------

// Si hay registros de chat, los carga
let msgArray;
messagesDao.findAll().then((res) => {
    msgArray = res;
});

// SOCKET
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
