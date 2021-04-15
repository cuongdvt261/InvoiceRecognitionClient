import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import HttpStatus from 'http-status-codes';

import { InvoiceRecognitionController } from '../controllers/recognition.controller';
import { Logger } from '../lib/logger.lib';

class RecogniteRoute {
  private readonly multer: multer.Multer;
  public express: express.Application;

  constructor() {
    this.express = express();
    this.multer = multer({ storage: this.store() });
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private store(): multer.StorageEngine {
    return multer.diskStorage({
      destination(req, file, cb) {
        cb(null, process.env.HOME_DIR || 'uploads/');
      },
      filename(req, file, cb) {
        cb(null, file.originalname);
      },
    });
  }

  private routes(): void {
    const controller = new InvoiceRecognitionController();
    const upload = this.multer.single('image');

    // Handle invoice recognition
    this.express.post('/upload', (req, res, next) => {
      upload(req, res, (err: any): void => {
        // Handle error
        if (err instanceof multer.MulterError) {
          res.json(err);
          res.statusCode = HttpStatus.NOT_ACCEPTABLE;
        } else if (err) {
          res.json(err);
          res.statusCode = HttpStatus.NOT_FOUND;
        }

        // Handle file input
        controller.post(req, res)
          .then(() => { })
          .catch((err) => {
            Logger.getInstance().error(err);
          });
      });
    });

    // Get all results
    this.express.get('/results', (req, res, next) => {
      controller.get(req, res)
        .then(() => { })
        .catch((err) => {
          Logger.getInstance().error(err);
        });
    });
  }
}

export default new RecogniteRoute().express;
