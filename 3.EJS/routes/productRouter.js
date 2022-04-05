const {
  getProducts,
  postProduct,
  delproduct,
} = require("../controllers/productsController");

const productRouter = require("express").Router();

productRouter.get("/", getProducts);
productRouter.post("/", postProduct);
productRouter.delete("/:id", delproduct);

module.exports = productRouter;
