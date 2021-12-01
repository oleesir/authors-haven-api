import { check } from 'express-validator';
import notEmpty from '../helper/notEmpty';

export default {
  signupUserSchema: [
    check('firstName')
      .trim()
      .exists()
      .withMessage('firstName is required')
      .custom(value => notEmpty(value, 'firstName field cannot be left blank'))
      .isLength({ min: 2 })
      .withMessage('name should be be at least 2 characters')
      .isAlpha()
      .withMessage('name should contain only alphabets')
      .customSanitizer(name => name.toLowerCase()),
    check('lastName')
      .trim()
      .exists()
      .withMessage('lastName is required')
      .custom(value => notEmpty(value, 'lasttName field cannot be left blank'))
      .isLength({ min: 2 })
      .withMessage('name should be be at least 2 characters')
      .isAlpha()
      .withMessage('name should contain only alphabets')
      .customSanitizer(name => name.toLowerCase()),
    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .custom(value => notEmpty(value, 'password field cannot be left blank'))
      .isLength({ min: 8, max: 15 })
      .withMessage('password should be a minimum of 8 characters')
  ],

  signinUserSchema: [
    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .custom(value => notEmpty(value, 'password field cannot be left blank'))
      .isLength({ min: 8 })
      .withMessage('password should be minimum of 8 characters')
  ],

  forgotPasswordSchema: [
    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .custom(value => notEmpty(value, 'email field cannot be left blank'))
      .isEmail()
      .withMessage('enter a valid email address')
      .customSanitizer(email => email.toLowerCase())
  ],
  resetPasswordSchema: [
    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .custom(value => notEmpty(value, 'password field cannot be left blank'))
      .isLength({ min: 8, max: 15 })
      .withMessage('password should be a minimum of 8 characters')
  ]
};
