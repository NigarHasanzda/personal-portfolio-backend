import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError";

type ValidationTarget = "body" | "query" | "params";

export const validate =
  (schema: ZodSchema, target: ValidationTarget = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      next(new ApiError(400, message));
      return;
    }
    if (target === "body") {
      req.body = result.data;
    } else if (target === "query") {
      Object.assign(req.query, result.data);
    } else {
      Object.assign(req.params, result.data);
    }
    next();
  };
