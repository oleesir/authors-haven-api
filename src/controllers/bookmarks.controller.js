import models from '../database/models';

const { Articles, Bookmarks } = models;

/**
 * bookmark an article
 * @method createBookmark
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createBookmark = async (req, res) => {
	const { id: userId } = req.decoded;

	const { articleId } = req.body;

	const foundArticle = await Articles.findOne({ where: { id: articleId } });

	if (!foundArticle) {
		return res
			.status(404)
			.json({ status: 'failure', error: 'article does not exist' });
	}

	const bookmarkedArticle = await Bookmarks.create({ ...req.body, userId });

	return res.status(201).json({ status: 'success', data: bookmarkedArticle });
};

/**
 * get an article that is bookmarked
 * @method getSingleBookmark
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getSingleBookmark = async (req, res) => {
	const { id: userId } = req.decoded;

	const { id: bookmarkId } = req.params;

	const bookmarkedArticle = await Bookmarks.findOne({
		where: { id: bookmarkId, userId },
	});

	if (!bookmarkedArticle) {
		return res
			.status(404)
			.json({ status: 'failure', error: 'bookmarked article does not exist' });
	}

	return res.status(200).json({ status: 'success', data: bookmarkedArticle });
};

/**
 * gets all articles that are bookmarked
 * @method getAllBookmarked
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllBookmarked = async (req, res) => {
	const { id: userId } = req.decoded;
	const page = req.query.page || 1;
	const limit = req.query.limit || 3;
	const offset = limit * (page - 1);

	const result = await Bookmarks.findAndCountAll({
		where: { userId },
		limit,
		offset,
		order: [['createdAt', 'DESC']],
	});

	const { count, rows } = result;

	const pageCount = Math.ceil(count / limit);

	res.status(200).json({
		status: 'success',
		data: rows,
		pagination: {
			itemCount: count,
			pageCount,
			currentPage: page,
		},
	});
};

/**
 * remove article from bookmark
 * @method deleteBookmark
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const deleteBookmark = async (req, res) => {
	const { id: userId } = req.decoded;

	const { id: bookmarkId } = req.params;

	const bookmarkedArticle = await Bookmarks.findOne({
		where: { id: bookmarkId, userId },
	});

	if (!bookmarkedArticle) {
		return res
			.status(404)
			.json({ status: 'failure', error: 'bookmarked article does not exist' });
	}

	await bookmarkedArticle.destroy();

	return res.status(200).json({
		status: 'success',
		message: 'the article has been removed from bookmark successfully',
	});
};

export default {
	createBookmark,
	getSingleBookmark,
	getAllBookmarked,
	deleteBookmark,
};
