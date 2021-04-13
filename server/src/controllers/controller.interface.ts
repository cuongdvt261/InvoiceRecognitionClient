import {Request, Response} from 'express';

export interface IController {
    delete(req: Request, res: Response): void;
    get(req: Request, res: Response): void;
    post(req: Request, res: Response): Promise<void>;
    put(req: Request, res: Response): void;
}
