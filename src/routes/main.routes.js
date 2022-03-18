import { Router } from "express";
import { getProductoRandom, getProductos, index } from "../controllers/main.controllers.js";

const router = Router();

router.get("/", index);

router.get("/productos", getProductos);

router.get("/productoRandom", getProductoRandom);

export default router;
