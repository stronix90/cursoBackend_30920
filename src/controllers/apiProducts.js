const productsList = require("../data/products");
const errInvalidID = { error: "El ID ingresado no corresponde" };

const getProducts = (req, res) => {
  res.send(productsList.getAllProducts());
};

const getOneProduct = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send(errInvalidID);

  res.send(productsList.getOneProduct(id));
};

const postProduct = (req, res) => {
  const response = productsList.createProduct(req.body)
  res.send(response);
};

const putProduct = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send(errInvalidID);

  res.send(productsList.updateProduct(id, req.body));
};

const delproduct = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send(errInvalidID);

  res.send(productsList.deleteProduct(id));
};

module.exports = {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  delproduct,
};
