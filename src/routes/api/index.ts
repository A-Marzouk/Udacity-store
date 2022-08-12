import express, { Request, Response } from "express";
import productsRoutes from "./products";
import ordersRoutes from "./orders";
import usersRoutes from "./users";
import authRoutes from "./authRoutes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("API ENDPOINT");
});

router.use("/", authRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/users", usersRoutes);

export default router;
