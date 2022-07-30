import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const errorHandler = (
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.issues });
  }

  return res.status(500).json({ message: error.message });
};

export default errorHandler;