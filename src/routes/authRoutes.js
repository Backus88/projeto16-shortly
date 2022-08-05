import {Router} from 'express';
import {signUp, signIn} from '../controllers/authControllers.js';
import signupValidation from '../middlewares/signupValidation.js';
import signinValidation from '../middlewares/signinValidation.js';

const authRouter = Router();
authRouter.post('/signup', signupValidation, signUp);
authRouter.post('/signin', signinValidation, signIn);

export default authRouter;
