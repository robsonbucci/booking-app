import { Router, Request, Response } from "express";
import Hotel from "../models/Hotel";

const router = Router();

router.post("/api/v1/hotels", async (req: Request, res: Response) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/api/v1/hotels/:id", async (req: Request, res: Response) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, 
    { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/api/v1/hotels/:id', async (req: Request, res: Response) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(204).json(deletedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/v1/hotels/:id", async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/v1/hotels", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
