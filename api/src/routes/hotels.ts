import { Router, Request, Response } from "express";
import Hotel from "../models/Hotel";

const router = Router();

router.post("/api/v1/hotels", async (req: Request, res: Response) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).send(savedHotel);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
