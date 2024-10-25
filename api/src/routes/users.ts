import { Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import Token from "../utils/verifyToken";

const router = Router();

// router.get(
//   "/checkauthentication",
//   Token.verifyToken,
//   (req: Request, res: Response, next: any) => {
//     res.status(200).send("You are logged in");
//   }
// );
// router.get("/checkuser/:id", Token.verifyUser,(req: Request, res: Response, next: any) => {
//   res.status(200).send("You are authenticated");
// });
// router.get("/checkadmin", Token.verifyAdmin, (req: Request, res: Response, next: any) => {
//   res.status(200).send("You are an admin and you can delete all accounts");
// })

router.put("/:id", Token.verifyUser, UserController.updateUser);
router.delete("/:id", Token.verifyUser, UserController.deleteUser);
router.get("/:id", Token.verifyUser, UserController.getUserById);
router.get("/", Token.verifyAdmin, UserController.getAllUsers);

export default router;
