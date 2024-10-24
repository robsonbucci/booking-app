import express, { Express } from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";


class AppController {
  private _express: Express;

  constructor() {
    this._express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this._express.use(express.json());
    this._express.use(cookieParser());
  }

  routes() {
    this._express.use(routes);
  }

  get express(): Express {
    return this._express;
  }
}

export default new AppController().express;
