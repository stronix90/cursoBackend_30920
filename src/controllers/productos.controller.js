const productsList = require("../data/productos");
const errInvalidID = { error: "El ID ingresado no corresponde" };

const getProducts = async (req, res) => {
  const { id } = req.params;

  if (id && isNaN(id)) {
    res.status(400).json(errInvalidID);
    return;
  }

  let response;
  if (id) response = await productsList.getOneProduct(id);
  else response = await productsList.getAllProducts();

  res.json(response);
};

const postProduct = async (req, res) => {
  const response = await productsList.createProduct(req.body);
  res.json(response);
};

const putProduct = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json(errInvalidID);
    return;
  }

  const response = await productsList.updateProduct(id, req.body);
  res.json(response);
};

const delproduct = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).json(errInvalidID);
    return;
  }

  const response = await productsList.deleteProduct(id);
  res.json(response);
};

module.exports = {
  getProducts,
  postProduct,
  putProduct,
  delproduct,
};
