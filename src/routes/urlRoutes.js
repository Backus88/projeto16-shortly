import {Router} from 'express';
import {
  shortenUrl,
  getUrls,
  getShortUrl,
  deleteUrl} from '../controllers/urlController.js';
import credentialsValidation from '../middlewares/credentialsValidation.js';
import joiValidation from '../middlewares/joiValidation.js';
import {shortenUrlSchema} from '../schemas/urlSchema.js';

const urlRouter = Router();
urlRouter.post('/urls/shorten',
    credentialsValidation, joiValidation(shortenUrlSchema), shortenUrl);
urlRouter.get('/urls/:id', getUrls);
urlRouter.get('/urls/open/:shortUrl', getShortUrl);
urlRouter.delete('/urls/:id', credentialsValidation, deleteUrl);

export default urlRouter;
