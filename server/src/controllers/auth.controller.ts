import HttpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IController } from './controller.interface';
import { User } from "@/models/user.model";
import appConfig from '@/config/app.config';

export class AuthController implements IController {
  public delete(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public put(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public get(req: Request, res: Response) {
    throw new Error('Method not implemented.');
  }

  public async post(req: Request, res: Response): Promise<void> {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.send({ status: 3 });
      res.statusCode = HttpStatus.NOT_FOUND;
      return;
    }

    // Find user
    const user = await User.findOne({ where: { Username: username } });
    if (!user) {
      res.send({ status: 3 });
      res.statusCode = HttpStatus.NOT_FOUND;
      return;
    }

    if (bcrypt.compareSync(password, user.Password!)) {
      // Send response
      const token = jwt.sign({ Username: username }, appConfig.privateKey, {
        expiresIn: 86400
      });
      console.log('token auth: ' + token);
      res.status(HttpStatus.OK).send({ status: 1, token: token });
      return
    }
  }
}
