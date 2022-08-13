import { NextFunction, Request, Response } from "express";
import { UserStore } from "../../models/user";

const jwt = require("jsonwebtoken");

export const requireAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = null;
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) token = authorizationHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.BCRYPT_SECRET);

      req.authUser = await UserStore.getById(decoded.id);

      next();
    } catch (e) {
      res.status(401);
      throw new Error("Invalid authorization headers");
    }
  }

  if (!token) {
    res.status(401).send({
      error: "You need to sign in to complete this action.",
    });
  }
};
