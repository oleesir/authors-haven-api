import { Router } from 'express';
import authRoutes from './auth.route';
import articleRoutes from './article.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);

export default router;
