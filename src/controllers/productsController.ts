import { NextFunction, Request, Response } from "express";
import { ProductStore } from "../models/product";
import { Product } from "../types/models";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await ProductStore.index();
    res.status(200).send({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const product = await ProductStore.show(id);

    if (!product) throw new Error("Product not found!");

    res.status(200).send({ product });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, category } = req.body;

  const product: Product = {
    id: 0,
    name,
    price,
    category,
  };

  try {
    const createdProduct = await ProductStore.create(product);
    res.status(200).send({ product: createdProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const deleted = await ProductStore.delete(id);

    if (!deleted) throw new Error("Product not found!");

    res.status(200).send({ success: true, deleted: id });
  } catch (error) {
    next(error);
  }
};
