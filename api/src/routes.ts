import { Router } from "express";
import hotelRoutes from "./routes/hotels";

const router = Router();

router.use(hotelRoutes);

export default router