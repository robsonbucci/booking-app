import { Router, Request, Response } from "express";
import hotelRoutes from "./routes/hotels";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const router = Router();

router.use("/api/v1/hotels", hotelRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/user", userRoutes);

router.use((err: any, req: Request, res: any, next: any) => {
  const errorStatus: number = err.status || 500;
  const errorMessage: string = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
export default router;
