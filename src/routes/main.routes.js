const  express = require('express');
const  router = express.Router();

const mainControllers = require('../controllers/main.controllers');
const {getProductoRandom, getProductos, index} = mainControllers

router.get("/", index);

router.get("/productos", getProductos);

router.get("/productoRandom", getProductoRandom);

module.exports = router
