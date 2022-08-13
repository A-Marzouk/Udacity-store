import express from "express";
import { addProduct, getUserOrder } from "../../controllers/ordersController";
import { requireAuthentication } from "../../middleware/Auth/authMiddleware";

const router = express.Router();

router.get("/:userId", requireAuthentication, getUserOrder);
router.post("/products", requireAuthentication, addProduct);

export default router;
