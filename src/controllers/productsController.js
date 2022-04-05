const productsList = require("../data/products");
const errInvalidID = { error: "El ID ingresado no corresponde" };

const getProducts = (req, res) => {
  const products = productsList.getAllProducts()
  console.log(products);
  res.render('productsList', {products});
};

const postProduct = (req, res) => {
  productsList.createProduct(req.body)
  res.redirect('/')
};

const delproduct = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send(errInvalidID);

  res.send(productsList.deleteProduct(id));
};

module.exports = {
  getProducts,
  postProduct,
  delproduct,
};
