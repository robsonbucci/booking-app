import { Request, Response } from "express";
import { ErrorFactory } from "../utils/error";
import User from "../models/User";

export default class UserController {
  static async getAllUsers(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async getUserById(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async updateUser(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async deleteUser(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(204).json(deletedUser);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }
}
