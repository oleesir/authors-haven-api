import { Router } from 'express';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
import searchTags from '../controllers/tags.controller';

const router = Router();

router.get('/search', asyncErrorHandler(searchTags));


export default router;
