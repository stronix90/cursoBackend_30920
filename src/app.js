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

// Si hay registros de chat, los carga
let msgArray;
messageStore.readFile().then((res) => {
  msgArray = res ? res : [];
});

// SOCKET
io.on("connection", (socket) => {
  // PRODUCTOS
  socket.emit("inicio", productsList.getAllProducts());

  socket.on("newProduct", (data) => {
    productsList.createProduct(data);
    io.sockets.emit("inicio", productsList.getAllProducts());
  });

  socket.on("deleteProduct", (id) => {
    productsList.deleteProduct(id);
    io.sockets.emit("inicio", productsList.getAllProducts());
  });

  // MENSAJES
  socket.on("getMessages", () => {
    socket.emit("inicioMsg", msgArray);
  });

  socket.on("newMessage", (newMsg) => {
    msgArray.push(newMsg);
    io.sockets.emit("newMessage", newMsg);
  });

  // // Desconexión
  socket.on("disconnect", () => {
    messageStore.saveFile(msgArray);
  });
});

module.exports = { httpServer, app };
