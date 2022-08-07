import {Router} from 'express';
import {getUniqueUser, userRanking} from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/users/me', getUniqueUser);
userRouter.get('/ranking', userRanking );

export default userRouter;
