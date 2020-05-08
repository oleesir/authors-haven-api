/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import cryptoRandomString from 'crypto-random-string';
import models from '../database/models';
import sendVerificationEmail from '../helper/sendMail';
import comparePassword from '../helper/comparePassword';
import generateToken from '../helper/generateToken';
import getSignupUserData from '../utils/user.utils';


const { Users, EmailVerifications } = models;

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

  const token = cryptoRandomString({ length: 16 });

  await EmailVerifications.create({ token, userId: newUser.id });

  await sendVerificationEmail(newUser.email, token);

  newUser.password = undefined;

  const data = { ...newUser.get() };

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

  if (!foundUser) return res.status(404).json({ status: 'failure', error: 'user does not exist' });

  if (foundUser) {
    const verifyUserPassword = await comparePassword(req.body.password, foundUser.password);

    if (!verifyUserPassword) return res.status(401).json({ status: 'failure', error: 'email or password is incorrect' });

    foundUser.password = undefined;

    const payload = {
      id: foundUser.id,
      email: foundUser.email
    };

    const token = generateToken(payload);

    const data = { ...foundUser.get(), token };

    return res.status(200).json({ status: 'success', data });
  }
};


/**
   * verify a new user
   * @method verifyEmailToken
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
const verifyEmailToken = async (req, res) => {
  const { email, token } = req.query;

  const foundUser = await Users.findOne({ where: { email } });

  if (!foundUser) return res.status(404).json({ status: 'failure', error: 'user does not exist' });

  if (foundUser) {
    if (foundUser.isVerified) return res.status(409).json({ status: 'failure', error: 'your email has been verified already' });

    if (!foundUser.isVerified) {
      const emailVerification = await EmailVerifications
        .findOne({ where: { userId: foundUser.id, token } });

      if (!emailVerification) return res.status(404).json({ status: 'failure', error: 'email verification failed. Your token might be expired or invalid' });

      if (emailVerification) {
        const now = Date.now();
        if (now > emailVerification.expiresOn) {
          const newToken = cryptoRandomString({ length: 16 });

          emailVerification.destroy();
          await EmailVerifications.create({ token: newToken, userId: foundUser.id });
          await sendVerificationEmail(foundUser.email, newToken);

          return res.status(404).json({ status: 'failure', error: 'sorry your token has expired' });
        }

        await Users.update({ isVerified: true }, { where: { email } });
        await emailVerification.destroy();
        return res.status(200).json({ status: 'success', message: 'email has been successfully verified' });
      }
    }
  }
};

export { signupUser, signinUser, verifyEmailToken };
