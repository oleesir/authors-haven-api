import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import validateSchema from '../validations/articleSchema';
import { uploadFiles } from '../helper/multer';
import validateResult from '../middlewares/validator.middleware';
import {
	createArticle,
	getSingleArticle,
	updateArticle,
	deleteArticle,
	getAllArticles,
	searchArticles,
} from '../controllers/article.controller';

const router = Router();

const { NUMBER_OF_FILES } = process.env;

const { createArticleSchema, getArticleSchema, updateArticleSchema, deleteArticleSchema } = validateSchema;

router.post(
	'/',
	checkToken,
	uploadFiles.array('avatar', NUMBER_OF_FILES),
	createArticleSchema,
	validateResult,
	asyncErrorHandler(createArticle),
);
router.get('/', asyncErrorHandler(getAllArticles));
router.get('/search', asyncErrorHandler(searchArticles));
router.get('/:id', checkToken, getArticleSchema, validateResult, asyncErrorHandler(getSingleArticle));
router.patch('/:id', checkToken, updateArticleSchema, validateResult, asyncErrorHandler(updateArticle));
router.delete('/:id', checkToken, deleteArticleSchema, validateResult, asyncErrorHandler(deleteArticle));

export default router;
