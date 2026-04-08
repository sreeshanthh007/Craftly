import { Request, Response, NextFunction } from "express";
import { logger } from "@shared/utils/logger";
import { ENV } from "@shared/constants/env";

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.path} - ${err.message}`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: ENV.NODE_ENV === "development" ? err.stack : undefined,
  });
};
