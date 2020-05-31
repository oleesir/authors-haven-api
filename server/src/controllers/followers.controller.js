import models from '../database/models';

const { Users, Followers } = models;
/**
   * follow a verified user
   * @method follow
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const followUser = async (req, res) => {
  const { followId } = req.body;
  const { id: userId } = req.decoded;

  const foundUser = await Users.findOne({ where: { id: followId } });

  if (!foundUser) return res.status(404).json({ status: 'failure', error: 'user does not exist on the app' });

  if (!foundUser.isVerified) return res.status(401).json({ status: 'failure', error: 'user is not verified' });

  if (userId === followId) return res.status(403).json({ status: 'failure', error: 'you cannot follow yourself' });

  const followedUser = await Followers.create({ userId, followId });

  return res.status(201).json({ status: 'success', data: followedUser, message: 'successfully followed author ' });
};

/**
   * unfollow a verified user
   * @method follow
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const unfollowUser = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.decoded;

  const foundUser = await Followers.findOne({ where: { followId: id } });

  if (!foundUser) return res.status(404).json({ status: 'failure', error: 'user does not exist on the app' });

  if (userId === id) return res.status(403).json({ status: 'failure', error: 'you cannot unfollow yourself' });

  await foundUser.destroy();

  return res.status(200).json({ status: 'success', message: 'successfully unfollowed author' });
};

/**
   * get people the user follows
   * @method follow
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const getFollowing = async (req, res) => {
  const { id: userId } = req.decoded;


  const following = await Followers.findAll({
    where: { userId },
    include: [{
      model: Users,
      required: true,
      attributes: ['id', 'firstName', 'lastName', 'email', 'role']
    }]
  });

  return res.status(200).json({ status: 'success', data: following });
};

/**
   * get followers
   * @method follow
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
export const getFollowers = async (req, res) => {
  const { id } = req.decoded;

  const followers = await Followers.findAll({
    where: { followId: id },
    include: [{
      model: Users,
      required: true,
      attributes: ['id', 'firstName', 'lastName', 'email', 'role']
    }]
  });

  return res.status(200).json({ status: 'success', data: followers });
};

export default {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers
};
