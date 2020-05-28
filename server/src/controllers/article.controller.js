import models from '../database/models';

const { Articles } = models;
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
export const getAllArticles = async (req, res) => {
  const { id: userId } = req.decoded;
  const { type } = req.query;
  let articles;


  if (type) {
    articles = await Articles.findAll({ where: { userId, type } });
    return res.status(200).json({ status: 'success', data: articles });
  }

  articles = await Articles.findAll({ where: { userId } });
  return res.status(200).json({ status: 'success', data: articles });
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
  deleteArticle
};
