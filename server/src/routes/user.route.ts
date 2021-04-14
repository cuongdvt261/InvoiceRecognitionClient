import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import HttpStatus from 'http-status-codes';

import { Logger } from '../lib/logger.lib';
import db from '@/models/';
import { User } from '@/models/user.model';

class UserRoute {
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
        db.sync({ force: true }).then(() => {
            console.log("Drop and re-sync db.");
        })
    }

    private routes(): void {
        this.express.get('/', (req, res, next) => {
            const user = new User({ Username: 'cuongdvt', Password: '12345', Name: 'Test', Group: 1, Description: '' });
            user.save();
        });
    }
}

export default new UserRoute().express;
