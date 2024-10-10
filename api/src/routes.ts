import { Router } from "express";
import hotelRoutes from "./routes/hotels";

const router = Router();

router.use("/api/v1/hotels", hotelRoutes);

export default router