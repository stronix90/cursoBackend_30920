const {
  postCart,
  delCart,
  getProductsInCart,
  addProductToCart,
  delProductFromCart,
} = require("../controllers/carrito.controller");

const router = require("express").Router();

router.post("/", postCart);
router.delete("/:id", delCart);
router.get("/:id/productos", getProductsInCart);
router.post("/:id/productos/:id_prod", addProductToCart);
router.delete("/:id/productos/:id_prod", delProductFromCart);

module.exports = router;
