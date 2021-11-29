import { Op } from 'sequelize';

import models from '../database/models';

const {
  Tags, Articles, Users
} = models;

/**
 * search Articles
 * @method searchAuthors
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
const searchAuthors = async (req, res) => {
  const limit = req.query.limit || 4;
  const { keyword } = req.query;

  const authors = await Users.findAll({
    where: {
      [Op.or]: [
        { firstName: { [Op.iLike]: `${keyword}` } },
        { lastName: { [Op.iLike]: `${keyword}` } }
      ]
    },
    include: [
      {
        model: Articles,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        },
        where: {
          status: 'published'
        },
        include: [{
          model: Tags,
          attributes: ['name'],
          through: { attributes: [] },
        }
        ]
      }
    ],
    limit
  });
  return res.status(200).json({ status: 'success', data: authors });
};


export default searchAuthors;
