import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';

import Routes from './src/routes/routes';

dotenv.config({path: `${__dirname}/.env`});

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

    // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(express.static('../client/dist/'));
  }

  private routes(): void {
    // homepage
    this.express.get('/', (req, res, next) => {
      res.sendFile('../client/dist/index.html');
    });

    // use route
    this.express.use('/api', Routes);

    // handle undefined routes
    this.express.use('*', (req, res, next) => {
      res.send('Make sure url is correct!');
    });
  }
}

export default new App().express;
