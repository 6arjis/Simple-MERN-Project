import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", postProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
