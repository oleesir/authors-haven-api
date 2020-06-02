import { check } from 'express-validator';
import notEmpty from '../helper/notEmpty';

export default {
  followUserSchema: [
    check('followId')
      .custom(value => notEmpty(value, 'followId field cannot be left blank'))
      .matches((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
      .withMessage('invalid id')
  ],
  unfollowUserSchema: [
    check('id')
      .custom(value => notEmpty(value, 'followId field cannot be left blank'))
      .matches((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
      .withMessage('invalid id')
  ],
};
