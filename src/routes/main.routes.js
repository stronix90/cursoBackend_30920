const  express = require('express');
const  router = express.Router();

const mainControllers = require('../controllers/main.controllers');
const getProductoRandom = mainControllers.getProductoRandom
const getProductos = mainControllers.getProductos
const index = mainControllers.index

router.get("/", index);

router.get("/productos", getProductos);

router.get("/productoRandom", getProductoRandom);

module.exports = router
