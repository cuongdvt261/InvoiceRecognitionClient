import HttpStatus from 'http-status-codes';
import path from 'path';
import moment from 'moment';
import autoIncrement from 'mongo-autoincrement';
import {Request, Response} from 'express';

import {MongoDb} from '../db/mongo.db';

import {IController} from './controller.interface';

export class InvoiceRecognitionController implements IController {
  public delete(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public put(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public async get(req: Request, res: Response) {
    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();
    if (db) {
      db
        .collection('invoice-recognition')
        .find({})
        .toArray((err, docs) => {
          if (err) {
            res.json(err);
            res.statusCode = HttpStatus.BAD_REQUEST;
          }
          res.send({result: docs});
          res.statusCode = HttpStatus.OK;
        });
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();

    if (db) {
      const index = await autoIncrement(db, 'invoice-recognition', 'id');
      const fileUploadPath = path.join(process.env.HOME_DIR!, req.file.filename);
      const fileDownload = 'Test';
      db
        .collection('invoice-recognition')
        .insertOne({
          id: index,
          fileUpload: fileUploadPath, dateTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          fileDownload,
        }, (err, result) => {
          if (err) {
            res.json(err);
            res.statusCode = HttpStatus.BAD_REQUEST;
          }
          res.json(result);
          res.statusCode = HttpStatus.OK;
        });
    } else {
      res.json({msg: 'could not connect to db'});
      res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
