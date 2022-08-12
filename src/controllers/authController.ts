import { User } from "../modelTypes/types";
import bcrypt from "bcrypt";
// @ts-ignore
import Client from "../database/db";
import { NextFunction, Request, Response } from "express";
import { UserStore } from "../models/user";
import { v4 as uuidV4 } from "uuid";

const jwt = require("jsonwebtoken");

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const secret = process.env.BCRYPT_SECRET || "";
  const { username, password } = req.body;

  // @ts-ignore
  const conn = await Client.connect();
  const sql = "SELECT password,id,username FROM users WHERE username=($1)";

  try {
    const result = await conn.query(sql, [username]);

    if (!result.rows.length)
      return Promise.reject(Error("username or password is incorrect"));

    const user = result.rows[0];

    if (bcrypt.compareSync(password + secret, user.password)) {
      const token = generateToken(user.id, secret);

      res.status(201).json({
        id: user.id,
        username: user.username,
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

/* Generate a Token */
const generateToken = (id: Number, secret: String): JsonWebKey => {
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};
