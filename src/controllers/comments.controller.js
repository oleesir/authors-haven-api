import models from '../database/models';

const { Articles, Comments } = models;
/**
 * create a new comment for an article
 * @method createComment
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createCommentOnArticle = async (req, res) => {
  const { id: userId } = req.decoded;
  const { articleId } = req.body;

  const foundArticle = await Articles.findOne({ where: { id: articleId } });

  if (!foundArticle) return res.status(404).json({ status: 'failure', error: 'article does not exist' });

  const { status } = foundArticle;

  if (status !== 'published') return res.status(400).json({ status: 'failure', error: 'you cannot comment on an unpublished article' });

  const parentComment = await Comments.create({
    ...req.body, userId, articleId, repliedTo: null
  });

  return res.status(201).json({ status: 'success', data: parentComment });
};


/**
 * create a reply comment
 * @method createReplyComment
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const createReplyComment = async (req, res) => {
  const { commentId } = req.params;
  const { id: userId } = req.decoded;

  const foundComment = await Comments.findOne({ where: { id: commentId } });

  if (!foundComment) return res.status(404).json({ status: 'failure', error: 'comment does not exist' });

  const { articleId: article } = foundComment;

  const replyComment = await Comments.create({
    ...req.body, userId, articleId: article, repliedTo: commentId
  });

  return res.status(201).json({ status: 'success', data: replyComment });
};

/**
 * updates a comment
 * @method updateComment
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const updateComment = async (req, res) => {
  const { id: userId } = req.decoded;
  const { id } = req.params;

  const foundComment = await Comments.findOne({ where: { id, userId } });

  if (!foundComment) return res.status(404).json({ status: 'failure', error: 'comment does not exist' });

  const updatedComment = await foundComment.update({ ...foundComment, ...req.body });

  return res.status(200).json({ status: 'success', data: updatedComment });
};


/**
 * gets article with all its comments
 * @method getAllCommentsForArticle
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllCommentsForArticle = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const offset = limit * (page - 1);
  const { articleId } = req.params;

  const result = await Comments.findAndCountAll({
    where: { articleId },
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  const { count, rows } = result;

  const pageCount = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    data: rows,
    pagination: {
      itemCount: count,
      pageCount,
      currentPage: page
    }
  });
};


/**
 * gets all replies to a comment
 * @method  getAllRepliesToComment
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const getAllRepliesToComment = async (req, res) => {
  const { commentId } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const offset = limit * (page - 1);

  const result = await Comments.findAndCountAll({
    where: {
      repliedTo: commentId
    },
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });
  const { count, rows } = result;

  const pageCount = Math.ceil(count / limit);

  res.status(200).json({
    status: 'success',
    data: rows,
    pagination: {
      itemCount: count,
      pageCount,
      currentPage: page
    }
  });
};

/**
 * deletes a comment
 * @method deleteComment
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const deleteComment = async (req, res) => {
  const { id: userId } = req.decoded;
  const { id } = req.params;

  const foundComment = await Comments.findOne({ where: { id, userId } });

  if (!foundComment) return res.status(404).json({ status: 'failure', error: 'comment does not exist' });

  foundComment.destroy();

  return res.status(200).json({ status: 'success', message: 'successfully deleted comment' });
};


export default {
  createCommentOnArticle,
  getAllCommentsForArticle,
  createReplyComment,
  getAllRepliesToComment,
  deleteComment,
  updateComment
};
