const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");

const productsList = require("./data/products");
const messageStore = require("./data/messages");

// Inicio aplicación
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

// ---------------------------------------------------------------------

// Si hay registros de chat, los carga
let msgArray;
messageStore.getMessages().then((res) => (msgArray = res));

// SOCKET
io.on("connection", async (socket) => {
  // PRODUCTOS
  const items = await productsList.initialLoad();
  if (items === false) console.error("Error al abrir base de datos de productos")
  socket.emit("inicio", items);

  socket.on("newProduct", async (data) => {
    const items = await productsList.createProduct(data, true);
    io.sockets.emit("inicio", items);
  });

  socket.on("deleteProduct", async (id) => {
    const items = await productsList.deleteProduct(id, true);
    io.sockets.emit("inicio", items);
  });

  // MENSAJES
  socket.on("getMessages", () => {
    socket.emit("inicioMsg", msgArray);
  });

  socket.on("newMessage", (newMsg) => {
    msgArray.push(newMsg);
    io.sockets.emit("newMessage", newMsg);
    messageStore.saveMsn(newMsg);
  });
});

module.exports = { httpServer, app };
