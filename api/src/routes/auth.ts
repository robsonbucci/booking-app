import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.loginUser);

export default router;
