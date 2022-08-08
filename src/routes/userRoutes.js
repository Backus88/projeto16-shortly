import {Router} from 'express';
import {getUniqueUser, userRanking} from '../controllers/userController.js';
import credentialsValidation from '../middlewares/credentialsValidation.js';

const userRouter = Router();

userRouter.get('/users/me', credentialsValidation, getUniqueUser);
userRouter.get('/ranking', userRanking );

export default userRouter;
