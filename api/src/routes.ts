import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Home");
});
export default routes;
