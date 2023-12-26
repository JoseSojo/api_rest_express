// INSTALLED
import express from 'express';
import cors from 'cors';

// NATIVE
import path from 'path';

// FUNCTIONS
import { Test } from './config/connection.js';

// ROUTES
import { SERVICES_REGISTERS } from './services.app.js';

export const RUN_SERVER = () => {
    Test();
    const app = express();
    
    // MIDDLEWARES
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended:false }));
    
    SERVICES_REGISTERS.map((cluster) => {
        app.use(cluster.path, cluster.routes);
        console.log(`---> LOAD ROUTE ${cluster.path}`)
    })

    app.use('/storage', express.static(path.join(process.cwd(), 'storage')));

    return app;
}
