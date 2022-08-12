import express from "express";
import { validateAddProduct } from "../../middleware/validators/productsValidator";
import { addProduct } from "../../controllers/productsController";

const router = express.Router();

router.post("/add", validateAddProduct, addProduct);

export default router;
