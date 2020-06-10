import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import { getAllArticlesByStatus } from '../controllers/article.controller';

const router = Router();

router.get('/:id/articles', checkToken, asyncErrorHandler(getAllArticlesByStatus));


export default router;
