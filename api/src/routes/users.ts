import {Router} from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getAllUsers);

export default router;