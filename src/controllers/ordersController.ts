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

export const index = async (request: Request, response: Response) => {};

export const show = async (request: Request, response: Response) => {};

export const create = async (request: Request, response: Response) => {};
