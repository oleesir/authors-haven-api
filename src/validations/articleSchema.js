import { check } from 'express-validator';
import notEmpty from '../helper/notEmpty';

export default {
	createArticleSchema: [
		check('title')
			.trim()
			.exists()
			.withMessage('title is required')
			.custom((value) => notEmpty(value, 'title field cannot be left blank'))
			.isLength({ min: 2 })
			.withMessage('name should be be at least 2 characters'),
		check('status').optional().isIn(['draft', 'published']).withMessage('status can either be published or draft'),
	],
	getArticleSchema: [check('id').isUUID(4).withMessage('invalid id')],
	updateArticleSchema: [
		check('id').isUUID(4).withMessage('invalid id'),
		check('title')
			.trim()
			.exists()
			.withMessage('title is required')
			.custom((value) => notEmpty(value, 'title field cannot be left blank'))
			.isLength({ min: 2 })
			.withMessage('name should be be at least 2 characters'),
		check('status').optional().isIn(['draft', 'published']).withMessage('status can either be published or draft'),
	],
	deleteArticleSchema: [check('id').isUUID(4).withMessage('invalid id')],
};
