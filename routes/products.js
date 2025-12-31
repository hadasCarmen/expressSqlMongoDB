import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
} from "../controllers/products.js";
const router = express.Router();
router.route("/").post(createProduct).get(getProducts);
router.route("/:id").get(getProduct);

export default router;
