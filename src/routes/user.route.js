import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import { getAllArticlesByStatus } from '../controllers/article.controller';
import searchAuthors from '../controllers/users.controller';

const router = Router();

router.get('/:id/articles', checkToken, asyncErrorHandler(getAllArticlesByStatus));
router.get('/search', asyncErrorHandler(searchAuthors));


export default router;
