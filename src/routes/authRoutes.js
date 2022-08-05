import {Router} from 'express';
import {signUp} from '../controllers/authControllers.js';
import signupValidation from '../middlewares/signupValidation.js';

const authRouter = Router();
authRouter.post('/signup', signupValidation, signUp);

export default authRouter;
