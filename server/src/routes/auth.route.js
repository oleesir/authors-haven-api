import { Router } from 'express';
import {
  signupUser,
  signinUser,
  verifyEmailToken,
  forgotPassword,
  resetPassword
} from '../controllers/auth.controller';
import validateResult from '../middlewares/validator.middleware';
import validateSchema from '../validations/authSchema';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';

const router = Router();

const {
  signupUserSchema, signinUserSchema, forgotPasswordSchema, resetPasswordSchema
} = validateSchema;

router.post('/signup', signupUserSchema, validateResult, asyncErrorHandler(signupUser));
router.post('/signin', signinUserSchema, validateResult, asyncErrorHandler(signinUser));
router.post('/forgotPassword', forgotPasswordSchema, validateResult, asyncErrorHandler(forgotPassword));
router.post('/resetPassword', resetPasswordSchema, validateResult, asyncErrorHandler(resetPassword));
router.get('/verification', asyncErrorHandler(verifyEmailToken));

export default router;
