import { NextFunction, Request, Response } from "express";
import { UserStore } from "../models/user";
import { User } from "../types/models";
import { v4 as uuidV4 } from "uuid";

export const getUsersList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await UserStore.index();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};

export const retrieveUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await UserStore.getById(id);

    if (!user) throw new Error("User not found!");

    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, username, password } = req.body;

  const user: User = {
    id: uuidV4(),
    firstName,
    lastName,
    username,
    password,
  };

  try {
    const createdUser = await UserStore.create(user);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};
