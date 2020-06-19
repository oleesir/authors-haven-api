import { check } from 'express-validator';
import notEmpty from '../helper/notEmpty';

export default {
  createTagSchema: [
    check('name')
      .trim()
      .exists()
      .withMessage('name is required')
      .custom(value => notEmpty(value, 'name field cannot be left blank'))
      .isLength({ min: 2 })
      .withMessage('name should be be at least 2 characters')
      .isAlpha()
      .withMessage('name should contain only alphabets')
      .customSanitizer(name => name.toLowerCase()),
  ]
};
