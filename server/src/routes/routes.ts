import bodyParser from 'body-parser';
import express from 'express';

import db from '@/models/';
import UploadRoute from './upload.route';
import UserRoute from "@/routes/user.route";
import AuthRoute from "@/routes/auth.route";

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
    db.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  private routes(): void {
    // this.express.use('/', UploadRoute);
    this.express.use('/user', UserRoute);
    this.express.use('/auth', AuthRoute);
  }
}

export default new Routes().express;
