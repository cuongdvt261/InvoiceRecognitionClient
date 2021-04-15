import HttpStatus from 'http-status-codes';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IController } from './controller.interface';
import { User } from "@/models/user.model";
import appConfig from "@/config/app.config";

export class UserController implements IController {
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
    const name = req.body.name;

    if (!username || !password || !name) {
      res.send({ status: 3 });
      res.statusCode = HttpStatus.NOT_FOUND;
    }

    // Find user
    const user = await User.findOne({ where: { Username: username, Password: password } });
    if (!user) {
      const hashPassword = bcrypt.hashSync(password, 10)
      const newUser = await new User({ Username: username, Password: hashPassword, Name: name, Group: 1 }).save()
      if (newUser) {
        const token = jwt.sign({ Username: username }, appConfig.privateKey, {
          expiresIn: 86400
        });
        res.status(HttpStatus.OK).send({ status: 1, token: token });
      } else {
        res.status(HttpStatus.NOT_FOUND).send({ status: 3 });
      }
      return
    }

    // Send response
    res.send({ status: 1, result: user });
    res.statusCode = HttpStatus.OK;
  }
}
