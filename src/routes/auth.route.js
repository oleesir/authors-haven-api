import { Router } from 'express';
import passport from 'passport';
import {
	signupUser,
	signinUser,
	verifyEmailToken,
	forgotPassword,
	resetPassword,
	socialLogin,
	loggedInUser,
	logoutUser,
} from '../controllers/auth.controller';
import validateResult from '../middlewares/validator.middleware';
import validateSchema from '../validations/authSchema';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import checkToken from '../middlewares/authorization.middleware';

const router = Router();

const { signupUserSchema, signinUserSchema, forgotPasswordSchema, resetPasswordSchema } = validateSchema;

router.post('/signup', signupUserSchema, validateResult, asyncErrorHandler(signupUser));
router.post('/signin', signinUserSchema, validateResult, asyncErrorHandler(signinUser));
router.post('/forgotPassword', forgotPasswordSchema, validateResult, asyncErrorHandler(forgotPassword));
router.post('/resetPassword', resetPasswordSchema, validateResult, asyncErrorHandler(resetPassword));
router.post('/verification', asyncErrorHandler(verifyEmailToken));
router.get('/loggedin', asyncErrorHandler(loggedInUser));
router.get('/logout', checkToken, asyncErrorHandler(logoutUser));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google'), asyncErrorHandler(socialLogin));

export default router;
