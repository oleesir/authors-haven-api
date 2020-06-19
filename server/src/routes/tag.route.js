import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import validateSchema from '../validations/tagSchema';
import validateResult from '../middlewares/validator.middleware';
import { createTags } from '../controllers/tags.controller';

const {
  createTagSchema
} = validateSchema;

const router = Router();

router.post('/', checkToken, createTagSchema, validateResult, asyncErrorHandler(createTags));


export default router;
