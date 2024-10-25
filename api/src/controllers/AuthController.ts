import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { ErrorFactory } from "../utils/error";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default class AuthController {
  static async createUser(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin,
      });
      await newUser.save();
      res.status(201).json("User has been created");
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async loginUser(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(ErrorFactory.createError(404, "User not found"));
      }

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return next(
          ErrorFactory.createError(400, "Wrong password or username")
        );
      }

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );

      const { password, isAdmin, ...otherDetails } = (user as any)._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ ...otherDetails });
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }
}
