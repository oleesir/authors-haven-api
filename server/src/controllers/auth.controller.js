/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import models from '../database/models';
import { generateToken, comparePassword } from '../helper/encryption';
import getSignupUserData from '../utils/user.utils';


const { Users } = models;

/**
   * Registers a new user
   * @method signupUser
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
const signupUser = async (req, res) => {
  const userData = getSignupUserData(req.body);

  const existingUser = await Users.findOne({
    where: {
      email: userData.email
    }
  });

  if (existingUser) {
    return res.status(409).json({ status: 'failure', error: 'User with that email already exists' });
  }

  const newUser = await Users.create({ ...userData });

  const payload = {
    newUser
  };

  const token = generateToken(payload);

  newUser.password = undefined;

  const data = { ...newUser.get(), token };

  return res.status(201).json({ status: 'success', data });
};


/**
   * Login a new user
   * @method signinUser
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
const signinUser = async (req, res) => {
  const foundUser = await Users.findOne({
    where: {
      email: req.body.email
    }
  });

  if (!foundUser) return res.status(401).json({ status: 'failure', error: 'email or password is incorrect' });

  if (foundUser) {
    const verifyUserPassword = await comparePassword(req.body.password, foundUser.password);

    if (!verifyUserPassword) return res.status(401).json({ status: 'failure', error: 'email or password is incorrect' });

    foundUser.password = undefined;

    const payload = {
      foundUser
    };
    const token = generateToken(payload);

    const data = { ...foundUser.get(), token };

    return res.status(200).json({ status: 'success', data });
  }
};

export { signupUser, signinUser };
