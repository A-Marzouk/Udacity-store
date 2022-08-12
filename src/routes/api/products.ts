import express from "express";
import { validateAddProduct } from "../../middleware/validators/productsValidator";
import {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
} from "../../controllers/productsController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validateAddProduct, addProduct);
router.delete("/:id", validateAddProduct, deleteProduct);

export default router;
