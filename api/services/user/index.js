import express from 'express';

// MIDDLEWARES
import multerMiddleware from '../../middlewares/multer.file.js';
import { IsAuth } from '../../middlewares/jwt.js';

// CONTROLLERS
import ProfileController from './controllers/profile.controller.js';
import FollowController from './controllers/followers.controller.js';
import PostController from './controllers/post.controller.js';

const router = express.Router();

// PROFILE
router.get('/', IsAuth, ProfileController.GetAllUser);
router.put('/data', IsAuth, ProfileController.UpdateUser);
router.post('/profile/:id', IsAuth, ProfileController.PushProfile)

// FOLLOW
router.post('/follow/:id', IsAuth, FollowController.Follow);

// POST
router.post('/post/create', IsAuth, multerMiddleware.single('file'), PostController.CreatePost);
router.get('/post/:id', IsAuth, PostController.AllPostUser);

export { router }
