import bodyParser from 'body-parser';
import express from 'express';

import UploadRoute from './upload.route';
import UserRoute from "@/routes/user.route";

class Routes {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  private routes(): void {
    // this.express.use('/', UploadRoute);
    this.express.use('/user', UserRoute);
  }
}

export default new Routes().express;
