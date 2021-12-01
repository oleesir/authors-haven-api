import { Router } from 'express';
import authRoutes from './auth.route';
import articleRoutes from './article.route';
import followRoutes from './follower.route';
import commentRoutes from './comment.route';
import userRoutes from './user.route';
import bookmarksRoutes from './bookmark.route';
import tagRoutes from './tag.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/follow', followRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/bookmarks', bookmarksRoutes);
router.use('/tags', tagRoutes);


export default router;
