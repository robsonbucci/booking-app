import express, { Express } from "express";
import routes from "./routes";


class AppController {
  private _express: Express;

  constructor() {
    this._express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this._express.use(express.json());
  }

  routes() {
    this._express.use(routes);
  }

  get express(): Express {
    return this._express;
  }
}

export default new AppController().express;
