import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import validateSchema from '../validations/bookmarkSchema';
import validateResult from '../middlewares/validator.middleware';

import {
  createBookmark,
  getSingleBookmark,
  getAllBookmarked,
  deleteBookmark
} from '../controllers/bookmarks.controller';

const {
  deleteBookmarkSchema,
  getBookmarkSchema,
  createBookmarkSchema
} = validateSchema;


const router = Router();

router.post('/', checkToken, createBookmarkSchema, validateResult, asyncErrorHandler(createBookmark));
router.get('/:id', checkToken, getBookmarkSchema, validateResult, asyncErrorHandler(getSingleBookmark));
router.get('/', checkToken, asyncErrorHandler(getAllBookmarked));
router.delete('/:id', checkToken, deleteBookmarkSchema, validateResult, asyncErrorHandler(deleteBookmark));

export default router;
