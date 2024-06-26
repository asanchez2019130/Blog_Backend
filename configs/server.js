'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import taskRoutes from '../src/task/task.routes.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.taskPath = '/Blog/v1/Task'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.taskPath, taskRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;