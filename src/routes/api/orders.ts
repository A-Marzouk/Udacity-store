import express from "express";
import {
  addProduct,
  index,
  show,
  create,
} from "../../controllers/ordersController";

const router = express.Router();

router.get("/orders", index);
router.get("/orders/:id", show);
router.post("/orders", create);
router.post("/orders/:id/products", addProduct);

export default router;
