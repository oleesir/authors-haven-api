import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import validateSchema from '../validations/commentSchema';
import validateResult from '../middlewares/validator.middleware';
import {
  createCommentOnArticle,
  createReplyComment,
  updateComment,
  deleteComment,
  getAllCommentsForArticle,
  getAllRepliesToComment
} from '../controllers/comments.controller';

const {
  createCommentSchema,
  replyCommentSchema,
} = validateSchema;

const router = Router();


router.post('/', checkToken, createCommentSchema, validateResult, asyncErrorHandler(createCommentOnArticle));
router.post('/:commentId/replies', checkToken, replyCommentSchema, validateResult, asyncErrorHandler(createReplyComment));
router.get('/articles/:articleId', asyncErrorHandler(getAllCommentsForArticle));
router.get('/:commentId/replies', asyncErrorHandler(getAllRepliesToComment));
router.patch('/:id', checkToken, asyncErrorHandler(updateComment));
router.delete('/:id', checkToken, asyncErrorHandler(deleteComment));


export default router;
