import express from "express";
import { validateAddProduct } from "../../middleware/validators/productsValidator";
import {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
} from "../../controllers/productsController";
import { requireAuthentication } from "../../middleware/Auth/authMiddleware";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", requireAuthentication, validateAddProduct, addProduct);
router.delete("/:id", requireAuthentication, validateAddProduct, deleteProduct);

export default router;
