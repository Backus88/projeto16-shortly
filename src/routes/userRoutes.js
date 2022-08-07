import {Router} from 'express';
import {getUniqueUser} from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/users/me', getUniqueUser);

export default userRouter;
