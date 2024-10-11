import { Router } from "express";
import HotelsController from "../controllers/HotelsController";

const router = Router();

router.post("/", HotelsController.createHotel);

router.put("/:id", HotelsController.updateHotel);

router.delete("/:id", HotelsController.deleteHotel);

router.get("/:id", HotelsController.getHotelById);

router.get("/", HotelsController.getAllHotel);

export default router;
