import {Router} from 'express';
import {signUp, signIn} from '../controllers/authControllers.js';
import {signInSchema, signUpSchema} from '../schemas/authSchema.js';
import joiValidation from '../middlewares/joiValidation.js';

const authRouter = Router();
authRouter.post('/signup', joiValidation(signUpSchema), signUp);
authRouter.post('/signin', joiValidation(signInSchema), signIn);

export default authRouter;
