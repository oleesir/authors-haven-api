import { Router } from 'express';
import checkToken from '../middlewares/authorization.middleware';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import validateSchema from '../validations/followerSchema';
import validateResult from '../middlewares/validator.middleware';
import {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers
} from '../controllers/followers.controller';

const router = Router();

const {
  followUserSchema,
  unfollowUserSchema
} = validateSchema;

router.post('/', checkToken, followUserSchema, validateResult, asyncErrorHandler(followUser));
router.get('/following', checkToken, asyncErrorHandler(getFollowing));
router.get('/followers', checkToken, asyncErrorHandler(getFollowers));
router.delete('/:id', checkToken, unfollowUserSchema, validateResult, asyncErrorHandler(unfollowUser));


export default router;
