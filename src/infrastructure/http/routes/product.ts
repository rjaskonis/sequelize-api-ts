import { Router } from "express";
import { storeProduct, deleteProduct, findAllProducts, findProductById } from "@http/controllers/product";

const router = Router();

router.get("/api/users", findAllProducts);
router.get("/api/users/:id", findProductById);
router.post("/api/users", storeProduct);
router.delete("/api/users", deleteProduct);

export default router;
