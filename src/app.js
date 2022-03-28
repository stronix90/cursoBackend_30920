const express = require("express");
const morgan = require("morgan");

const apiProductRouter = require("./routes/apiProductRouter");

// Inicio aplicación
const app = express();

// Settings
app.set("port", 8080);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static('public'))

// Routes
app.use("/api/productos", apiProductRouter);

module.exports = app;
