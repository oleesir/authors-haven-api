import { check } from 'express-validator';

export default {
  signupUserSchema: [
    check('firstName')
      .trim()
      .exists()
      .withMessage('firstName is required')
      .isLength({ min: 2, max: 30 })
      .withMessage('name should be between 2 to 30 characters')
      .isAlpha()
      .withMessage('name should contain only alphabets')
      .customSanitizer(name => name.toLowerCase()),
    check('lastName')
      .trim()
      .exists()
      .withMessage('lastName is required')
      .isLength({ min: 2, max: 30 })
      .withMessage('name should be between 2 to 30 characters')
      .isAlpha()
      .withMessage('name should contain only alphabets')
      .customSanitizer(name => name.toLowerCase()),
    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('password should be between 8 to 15 characters'),
  ],

  signinUserSchema: [
    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('password should be between 8 to 15 characters'),
  ],

  forgotPasswordSchema: [
    check('email')
      .trim()
      .exists()
      .withMessage('email is required')
      .isEmail()
      .withMessage('enter a valid email address')
      .customSanitizer(email => email.toLowerCase())
  ],
  resetPasswordSchema: [
    check('password')
      .trim()
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('password should be between 8 to 15 characters')
  ]
};
