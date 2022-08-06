import {Router} from 'express';
import {shortenUrl} from '../controllers/urlController.js';
import shortenUrlValidation from '../middlewares/shortenurlValidation.js';

const urlRouter = Router();
urlRouter.post('/urls/shorten', shortenUrlValidation, shortenUrl);

export default urlRouter;
