import { NextFunction, Request, Response } from "express";
import { OrderStore } from "../models/order";

export const addProduct = async (request: Request, response: Response) => {
  const orderId: string = request.params.id;
  const productId: string = request.body.productId;
  const quantity: number = parseInt(request.body.quantity);

  try {
    const addedProduct = await OrderStore.addProductToOrder(
      quantity,
      orderId,
      productId
    );
    response.json(addedProduct);
  } catch (err) {
    response.status(400);
    response.json(err);
  }
};

export const getUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const order = await OrderStore.getOrderByUserId(userId);

    if (!order) throw new Error("Order not found!");

    res.status(200).send({ order });
  } catch (error) {
    next(error);
  }
};
