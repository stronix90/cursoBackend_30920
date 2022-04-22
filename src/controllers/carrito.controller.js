const cartStorage = require("../data/carrito");
const errInvalidID = { error: "El ID ingresado no corresponde" };

const postCart = async (req, res) => {
  const response = await cartStorage.createCart();
  res.json(response);
};

const delCart = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json(errInvalidID);
    return;
  }

  const response = await cartStorage.deleteCart(id);
  res.json(response);
};
const getProductsInCart = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json(errInvalidID);
    return;
  }

  const response = await cartStorage.getCart(id);
  res.json(response);
};
const addProductToCart = async (req, res) => {
  const { id, id_prod } = req.params;

  if (isNaN(id) || isNaN(id_prod)) {
    res.status(400).json(errInvalidID);
    return;
  }

  const response = await cartStorage.addProductToCart(id, id_prod);
  res.json(response);
};
const delProductFromCart = async (req, res) => {
      const { id, id_prod } = req.params;

  if (isNaN(id) || isNaN(id_prod)) {
    res.status(400).json(errInvalidID);
    return;
  }

  const response = await cartStorage.deleteProductFromCart(id, id_prod);
  res.json(response);
};

module.exports = {
  postCart,
  delCart,
  getProductsInCart,
  addProductToCart,
  delProductFromCart,
};
