import {Router} from 'express';
import {shortenUrl,
  getUrls,
  getShortUrl} from '../controllers/urlController.js';
import shortenUrlValidation from '../middlewares/shortenurlValidation.js';

const urlRouter = Router();
urlRouter.post('/urls/shorten', shortenUrlValidation, shortenUrl);
urlRouter.get('/urls/:id', getUrls);
urlRouter.get('/urls/open/:shortUrl', getShortUrl);

export default urlRouter;
