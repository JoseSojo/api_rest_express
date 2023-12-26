// ROUTES
import { router as RouterAuth } from './services/auth/index.js';
import { router as RouterHome } from './services/home/index.js';
import { router as RouterUser } from './services/user/index.js';

/**
 * CONSTANT
 * [obj] => { path: '/ulr', routes:RouterExpress }
 */

export const SERVICES_REGISTERS = [
    {
        path: '/auth',
        routes: RouterAuth
    },
    {
        path: '/home',
        routes: RouterHome
    },
    {
        path: '/user',
        routes: RouterUser
    }
]
