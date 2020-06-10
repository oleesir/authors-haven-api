import models from '../database/models';

const { Articles, Users } = models;
/**
   * create a new article
   * @method createArticle
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const createArticle = async (req, res) => {
  const { id: userId } = req.decoded;

  const article = await Articles.create({ ...req.body, userId });

  return res.status(201).json({ status: 'success', data: article });
};


/**
   * create a get a single Article
   * @method getSingleArticle
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const getSingleArticle = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const foundArticle = await Articles.findOne({ where: { id, userId } });

  if (!foundArticle) return res.status(404).json({ status: 'failure', error: 'article does not exist' });

  return res.status(200).json({ status: 'success', data: foundArticle });
};


/**
   * get all articles
   * @method getAllArticles
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const getAllArticlesByStatus = async (req, res) => {
  const { id: userId } = req.decoded;
  const { id } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const offset = limit * (page - 1);
  const { status } = req.query;

  const foundUser = await Users.findOne({ where: { id } });

  if (!foundUser) return res.status(404).json({ status: 'failure', error: 'user does not exist' });

  if (foundUser.id !== userId) return res.status(401).json({ status: 'failure', error: 'you not authorized' });

  const { count, rows: articles } = await Articles.findAndCountAll({
    where: { status },
    limit,
    offset
  });

  const pageCount = Math.ceil(count / limit);
  return res.status(200).json({
    status: 'success',
    data: articles,
    pagination: {
      itemCount: count,
      pageCount,
      currentPage: page
    }
  });
};

/**
   * get all articles
   * @method getAllArticles
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const getAllArticles = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  const offset = limit * (page - 1);


  const result = await Articles.findAndCountAll({
    where: {
      status: 'published'
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
   * update article
   * @method updateArticle
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const foundArticle = await Articles.findOne({ where: { id, userId } });

  if (!foundArticle) return res.status(404).json({ status: 'failure', error: 'article does not exist' });

  const updatedArticle = await foundArticle.update({ ...foundArticle, ...req.body });

  return res.status(200).json({ status: 'success', data: updatedArticle });
};

/**
   * delete article
   * @method deleteArticle
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const foundArticle = await Articles.findOne({ where: { id, userId } });

  if (!foundArticle) return res.status(404).json({ status: 'failure', error: 'article does not exist' });

  await foundArticle.destroy();

  return res.status(200).json({ status: 'success', message: 'article was deleted successfully' });
};


export default {
  createArticle,
  getSingleArticle,
  getAllArticles,
  updateArticle,
  getAllArticlesByStatus,
  deleteArticle
};
