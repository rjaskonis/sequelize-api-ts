import { Router } from "express";
import { findProducts, findProductById, createProduct, updateProduct, deleteProduct } from "@http/controllers/product";

const router = Router();

router.get("/api/products", findProducts);
router.get("/api/products/:id", findProductById);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

export default router;
