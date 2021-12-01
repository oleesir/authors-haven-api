import { check } from 'express-validator';
import notEmpty from '../helper/notEmpty';

export default {
  createCommentSchema: [
    check('body')
      .trim()
      .exists()
      .withMessage('comment is required')
      .custom(value => notEmpty(value, 'comment field cannot be left blank'))
      .isLength({ min: 2 })
      .withMessage('comment should be be at least 2 characters'),
    check('articleId')
      .exists()
      .withMessage('articleId is required')
      .custom(value => notEmpty(value, 'articleId field cannot be left blank'))
      .matches((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
      .withMessage('articleId is not valid')
  ],
  replyCommentSchema: [
    check('body')
      .trim()
      .exists()
      .withMessage('comment is required')
      .custom(value => notEmpty(value, 'comment field cannot be left blank'))
      .isLength({ min: 2 })
      .withMessage('comment should be be at least 2 characters'),
    check('commentId')
      .exists()
      .withMessage('commentId is required')
      .custom(value => notEmpty(value, 'articleId field cannot be left blank'))
      .matches((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
      .withMessage('commentId is not valid')
  ],
  getCommentsSchema: [
    check('commentId')
      .exists()
      .withMessage('commentId is required')
      .custom(value => notEmpty(value, 'articleId field cannot be left blank'))
      .matches((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
      .withMessage('commentId is not valid')
  ]
};
