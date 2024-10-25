import { Router } from "express";
import HotelsController from "../controllers/HotelsController";
import Token from "../utils/verifyToken";

const router = Router();

router.post("/", Token.verifyAdmin, HotelsController.createHotel);

router.put("/:id", Token.verifyAdmin, HotelsController.updateHotel);

router.delete("/:id", Token.verifyAdmin, HotelsController.deleteHotel);

router.get("/:id", HotelsController.getHotelById);

router.get("/", HotelsController.getAllHotel);

export default router;
