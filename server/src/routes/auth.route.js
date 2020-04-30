import { Router } from 'express';
import { signupUser, signinUser } from '../controllers/auth.controller';
import validateResult from '../middlewares/validator.middleware';
import validateSchema from '../validations/authSchema';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const { signupUserSchema, signinUserSchema } = validateSchema;

router.post('/signup', signupUserSchema, validateResult, asyncErrorHandler(signupUser));
router.post('/signin', signinUserSchema, validateResult, asyncErrorHandler(signinUser));

export default router;
