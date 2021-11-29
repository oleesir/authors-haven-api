import { Op } from 'sequelize';

import models from '../database/models';

const {
  Tags, Articles
} = models;

/**
 * search Tags
 * @method searchTags
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
const searchTags = async (req, res) => {
  const limit = req.query.limit || 4;
  const { keyword } = req.query;

  const tags = await Tags.findAll({
    where: {
      name: { [Op.iLike]: `${keyword}` }
    },
    include: [
      {
        model: Articles,
        where: {
          status: 'published'
        },
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        },
        through: { attributes: [] }
      }
    ],
    limit
  });

  return res.status(200).json({ status: 'success', data: tags });
};

export default searchTags;
