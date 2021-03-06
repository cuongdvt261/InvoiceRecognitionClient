import HttpStatus from 'http-status-codes';
import path from 'path';
import moment from 'moment';
import e, { Request, Response } from 'express';
import fs from 'fs';
import WebSocketAsPromised from 'websocket-as-promised';
import jwt from "jsonwebtoken";

import { IController } from './controller.interface';
import appConfig from '@/config/app.config';
import Constants from '@/helper/constants';
import { FileType, MessageAction, MessageId, MessageType, ReturnCode } from '@/helper/enums';
import { Logger } from '@/lib/logger.lib';
import { Recognite } from '@/models/recognite.model';
import { User } from '@/models/user.model';
export class InvoiceRecognitionController implements IController {
  wsp: WebSocketAsPromised

  constructor() {
    this.wsp = new WebSocketAsPromised(appConfig.ws_url, {
      packMessage: data => JSON.stringify(data),
      unpackMessage: data => JSON.parse(data as string),
      attachRequestId: (data, requestId) => Object.assign({ id: requestId }, data), // attach requestId to message as `id` field
      extractRequestId: data => data && data.id,
    })
    this.wsp.send('message')
  }

  public delete(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public put(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public async get(req: Request, res: Response) {
    const token = req.headers['x-access-token']
    const tokenStr = this.getToken(token as string)
    const recogs = await Recognite.findAll({where: {Username: (tokenStr as any).Username}})
    res.status(HttpStatus.OK).send({ status: 1, recogs: recogs})
  }

  public async post(req: Request, res: Response): Promise<void> {
    const token = req.headers['x-access-token']
    const tokenStr = this.getToken(token as string)

    // Get recognite result
    const obj = await this.sendRecogniteToWS(req.file.filename)
    if (!obj) {
      console.log("AAAAAA")
      return
    }

    // Save result file - Fake json
    const fakeResponse = {
      "1": [["1", "1", "153.789"], ["1", "2", "23456"], ["12", "14", "12213"]],
      "2": [["1", "1", "153.789"], ["1", "2", "23456"], ["12", "14", "12213"]],
      "3": [["1", "1", "153.789"], ["1", "2", "23456"], ["12", "14", "12213"]]
    }

    // Save result file
    const downloadFilename = `result_${req.file.originalname.split('.').slice(0, -1)}_${moment(Date.now()).format('YYMMDDHHmm')}.csv`
    const fileDownload = this.saveCsvFile(fakeResponse, downloadFilename)
    console.log(fileDownload)

    // Get current user
    const currentUser = await this.getCurrentUser((tokenStr as any).Username)
    if (!currentUser) {
      res.status(HttpStatus.NOT_FOUND).send({ status: 3 })
      return
    }

    const recognite = new Recognite({ FileUpload: req.file.filename, FileResult: downloadFilename, Username: currentUser.Username })
    const recogRes = await recognite.save()
    if (recogRes) {
      res.status(HttpStatus.OK).send({ status: 1, result: recogRes })
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ status: 3 })
    }
  }

  private async sendRecogniteToWS(filename: string) {
    const fileUploadPath = path.join(appConfig.upload_dir, filename);
    const base64data = await this.base64Encode(fileUploadPath)
    if (base64data) {
      const reqObj = {
        [Constants.TAG_MSG_ID]: MessageId.MSG_FILE,
        [Constants.TAG_MSG_TYPE]: MessageType.MSG_TYPE_REQUEST,
        [Constants.TAG_MSG_ACTION]: MessageAction.MSG_ACTION_UPLOAD,
        [Constants.TAG_SEQ_NO]: 0,
        [Constants.TAG_NUMBER_PART]: 0,
        [Constants.TAG_CONTENT]: {
          [Constants.TAG_NAME]: filename,
          [Constants.TAG_MODE_DATA]: FileType.PDF,
          [Constants.TAG_SIZE]: base64data.length,
          [Constants.TAG_CONTENT]: base64data
        }
      }

      // Send to process server
      return await this.sendRequest(reqObj)
    }
  }

  private getCurrentUser(username: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      User.findOne({ where: { Username: username } }).then(user => {
        if (!user) reject()
        resolve(user)
      })
    })
  }

  private getToken(token: string): string | object | null {
    try {
      const obj = jwt.verify(token, appConfig.privateKey)
      return obj ? obj : null
    } catch (err) {
      Logger.getInstance().error(err)
      return null
    }
  }

  private sendRequest(reqObj: any) {
    return this.wsp.sendRequest(reqObj).then(response => {
      return new Promise((resolve, reject) => {
        if (response[Constants.TAG_CONTENT][Constants.TAG_ERROR_CODE] == ReturnCode.PermissionDenined) {
          reject()
        } else {
          resolve(response);
        }
      })
    })
  }

  private saveCsvFile(obj: {}, filename: string): string | undefined {
    let arr: string[] = []
    for (const [key, value] of Object.entries(obj)) {
      (value as string[][]).forEach(item => {
        arr.push(`${key},${item.join(',')}`)
      })
    }
    try {
      if (arr.length > 0) {
        const strContent = arr.join('\n');
        const downloadPath = path.resolve(appConfig.download_dir, filename);
        fs.writeFileSync(downloadPath, strContent)
        return downloadPath
      }
    } catch {
      return undefined
    }
    return undefined
  }

  private base64Encode(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data.toString('base64'))
      })
    })
  }
}
