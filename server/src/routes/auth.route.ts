import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import HttpStatus from 'http-status-codes';

import { Logger } from '../lib/logger.lib';
import { AuthController } from '@/controllers/auth.controller';

class AuthRoute {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private routes(): void {
    const controller = new AuthController();

    this.express.post('/', (req, res, next) => {
      controller.post(req, res)
        .then()
        .catch(err => {
          console.log(err)
        });
    });
  }
}

export default new AuthRoute().express;
