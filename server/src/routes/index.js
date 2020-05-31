import { Router } from 'express';
import authRoutes from './auth.route';
import articleRoutes from './article.route';
import followRoutes from './follower.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/follow', followRoutes);

export default router;
