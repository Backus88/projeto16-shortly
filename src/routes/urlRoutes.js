import {Router} from 'express';
import {
  shortenUrl,
  getUrls,
  getShortUrl,
  deleteUrl} from '../controllers/urlController.js';
import shortenUrlValidation from '../middlewares/shortenurlValidation.js';
import credentialsValidation from '../middlewares/credentialsValidation.js';

const urlRouter = Router();
urlRouter.post('/urls/shorten',
    credentialsValidation, shortenUrlValidation, shortenUrl);
urlRouter.get('/urls/:id', getUrls);
urlRouter.get('/urls/open/:shortUrl', getShortUrl);
urlRouter.delete('/urls/:id', credentialsValidation, deleteUrl);

export default urlRouter;
