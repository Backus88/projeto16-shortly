import {Router} from 'express';
import authRouter from './authRoutes.js';
import urlRouter from './urlRoutes.js';

const router = Router();
router.use(authRouter);
router.use(urlRouter);

export default router;
