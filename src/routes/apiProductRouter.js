const {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  delproduct,
} = require("../controllers/apiProducts");

const apiProductRouter = require("express").Router();

apiProductRouter.get("/", getProducts);
apiProductRouter.get("/:id", getOneProduct);
apiProductRouter.post("/", postProduct);
apiProductRouter.put("/:id", putProduct);
apiProductRouter.delete("/:id", delproduct);

module.exports = apiProductRouter;
