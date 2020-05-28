import { Router } from 'express';
import articleController from '../controllers/article.controller';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import validateSchema from '../validations/articleSchema';
import validateResult from '../middlewares/validator.middleware';

const router = Router();

const {
  createArticleSchema,
  getArticleSchema,
  updateArticleSchema,
  deleteArticleSchema
} = validateSchema;
const {
  createArticle,
  getSingleArticle,
  getAllArticles,
  updateArticle,
  deleteArticle
} = articleController;

router.post('/', checkToken, createArticleSchema, validateResult, asyncErrorHandler(createArticle));
router.get('/:id', checkToken, getArticleSchema, validateResult, asyncErrorHandler(getSingleArticle));
router.get('/', checkToken, asyncErrorHandler(getAllArticles));
router.patch('/:id', checkToken, updateArticleSchema, validateResult, asyncErrorHandler(updateArticle));
router.delete('/:id', checkToken, deleteArticleSchema, validateResult, asyncErrorHandler(deleteArticle));

export default router;
