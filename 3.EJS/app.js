const express = require("express");
const morgan = require("morgan");
const path = require('path');

const mainRouter = require("../src/routes/mainRouter");
const productRouter = require("../src/routes/productRouter");

// Inicio aplicación
const app = express();

// Settings
app.set("port", 8080);

// Handlebars
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static('public'))

// Routes
app.use("/", mainRouter);
app.use("/productos", productRouter);

module.exports = app;
