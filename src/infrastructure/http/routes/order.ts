import { Router } from "express";
import { findOrders, findOrderById, createOrder } from "@http/controllers/order";

const router = Router();

router.get("/api/orders", findOrders);
router.get("/api/orders/:id", findOrderById);
router.post("/api/orders", createOrder);

export default router;
