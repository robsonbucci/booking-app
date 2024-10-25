import { Request, Response } from "express";
import { ErrorFactory } from "./error";
import jwt from "jsonwebtoken";

export default class Token {
  static verifyToken(req: Request, res: Response, next: any) {
    const token = req.cookies.access_token;

    if (!token) {
      return next(ErrorFactory.createError(401, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
      if (err) return next(ErrorFactory.createError(403, "Token is not valid"));
      (req as any).user = user;
      next();
    });
  }

  static verifyUser(req: Request, res: Response, next: any) {
    Token.verifyToken(req, res, () => {
      if ((req as any).user.id === req.params.id || (req as any).user.isAdmin) {
        next();
      } else {
        return next(ErrorFactory.createError(403, "You are not authorized"));
      }
    });
  }

  static verifyAdmin(req: Request, res: Response, next: any) {
    Token.verifyToken(req, res, () => {
      if ((req as any).user.isAdmin) {
        next();
      } else {
        return next(ErrorFactory.createError(403, "You are not authorized"));
      }
    });
  }
}
