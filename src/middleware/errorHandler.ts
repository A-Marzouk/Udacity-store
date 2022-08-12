import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(res.statusCode ?? 500).json({
    errors: [
      {
        msg: err.message
      }
    ]
  });

  next();
};

export default errorHandler;
