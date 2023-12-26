import express from 'express';
import { NotAuth } from '../../middlewares/jwt.js';
import LoginController from './controllers/login.controller.js';
import RegisterController from './controllers/register.controller.js';

const router = express.Router(); // instance

router.post('/login', NotAuth, LoginController.Login);
router.post('/register', NotAuth, RegisterController.Register);

export { router }
