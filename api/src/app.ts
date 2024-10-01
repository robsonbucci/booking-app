import express, { Express } from "express";

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
    // this._express.use(import './routes');
  }

  get express(): Express {
    return this._express;
  }
}

export default new AppController().express;
