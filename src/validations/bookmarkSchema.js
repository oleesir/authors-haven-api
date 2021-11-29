import { check } from 'express-validator';
import notEmpty from '../helper/notEmpty';

export default {
  createBookmarkSchema: [
    check('articleId')
      .exists()
      .withMessage('articleId is required')
      .custom(value => notEmpty(value, 'articleId field cannot be left blank'))
      .matches((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
      .withMessage('articleId is not valid')
  ],
  getBookmarkSchema: [
    check('id').isUUID(4)
      .withMessage('invalid id')
  ],
  deleteBookmarkSchema: [
    check('id').isUUID(4)
      .withMessage('invalid id')
  ]
};
