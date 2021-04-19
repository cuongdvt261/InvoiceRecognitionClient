import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import HttpStatus from 'http-status-codes';

import { InvoiceRecognitionController } from '../controllers/recognition.controller';
import { Logger } from '../lib/logger.lib';
import appConfig from '@/config/app.config';
import moment from 'moment';
import { AuthController } from '@/controllers/auth.controller';
import { ReturnCode } from '@/helper/enums';

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
        cb(null, appConfig.upload_dir);
      },
      filename(req, file, cb) {
        cb(null, file.originalname.replace('.', `_${moment(Date.now()).format('YYYYMMDDHHmmss')}.`));
      },
    });
  }

  private routes(): void {
    const controller = new InvoiceRecognitionController();
    const upload = this.multer.single('image');

    // Handle invoice recognition
    this.express.post('/', (req, res, next) => {
      const token = req.headers['x-access-token'] as string
      if (AuthController.isValidToken(token)) {
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
      } else {
        res.status(HttpStatus.OK).json({ status: ReturnCode.PermissionDenined })
      }
    });

    // Get all results
    this.express.get('/all', (req, res, next) => {
      const token = req.headers['x-access-token'] as string
      console.log('token: ' + token)
      if (AuthController.isValidToken(token)) {
        controller.get(req, res)
        .then(() => { })
        .catch((err) => {
          Logger.getInstance().error(err);
        });
      } else {
        res.status(HttpStatus.OK).json({ status: ReturnCode.PermissionDenined })
      }
    });
  }
}

export default new RecogniteRoute().express;
