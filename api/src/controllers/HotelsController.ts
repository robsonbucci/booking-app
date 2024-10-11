import { Request, Response } from "express";
import Hotel from "../models/Hotel";
import { ErrorFactory } from "../utils/error";

export default class HotelsController {
  static async createHotel(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    const newHotel = new Hotel(req.body);
    try {
      const savedHotel = await newHotel.save();
      res.status(201).json(savedHotel);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async updateHotel(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async deleteHotel(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
      res.status(204).json(deletedHotel);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async getHotelById(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }

  static async getAllHotel(
    req: Request,
    res: Response,
    next: any
  ): Promise<void> {
    try {
      const hotels = await Hotel.find();
      res.status(200).json(hotels);
    } catch (error) {
      next(ErrorFactory.createError(500, (error as Error).message));
    }
  }
}
