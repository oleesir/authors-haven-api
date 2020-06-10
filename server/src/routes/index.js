import { Router } from 'express';
import authRoutes from './auth.route';
import articleRoutes from './article.route';
import followRoutes from './follower.route';
import commentRoutes from './comment.route';
import userRoutes from './user.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/follow', followRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

export default router;
