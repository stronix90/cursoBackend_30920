const {
  getProducts,
  postProduct,
  putProduct,
  delproduct,
} = require("../controllers/productos.controller");
const onlyAdmin = require("../middleware/middleware");

const router = require("express").Router();

router.get("/:id?", getProducts);
router.post("/", onlyAdmin, postProduct);
router.put("/:id", onlyAdmin, putProduct);
router.delete("/:id", onlyAdmin, delproduct);

module.exports = router;
