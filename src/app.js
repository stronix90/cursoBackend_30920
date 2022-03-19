const express = require('express');
const morgan = require('morgan');
const mainRoutes = require('./routes/main.routes');

// Inicio aplicación
const app = express();

// Settings
app.set("port", 8080);

// Middlewares
app.use(morgan("dev"));

// Routes
app.use(mainRoutes);

module.exports = app

