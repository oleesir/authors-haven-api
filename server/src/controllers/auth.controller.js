import cryptoRandomString from 'crypto-random-string'
import { Op } from 'sequelize'
import moment from 'moment'
import models from '../database/models'
import { sendVerificationEmail, sendForgotPasswordEmail, sendResetPasswordEmail } from '../helper/sendMail'
import comparePassword from '../helper/comparePassword'
import getSignupUserData from '../utils/user.utils'
import { generateToken } from '../helper/generateTokens'
import jwt from 'jsonwebtoken'
const { Users, EmailVerifications } = models

/**
 * Registers a new user
 * @method signupUser
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const signupUser = async (req, res) => {
  try {
    const userData = getSignupUserData(req.body)

    const existingUser = await Users.findOne({
      where: {
        email: userData.email,
      },
    })

    if (existingUser) {
      return res.status(409).json({
        status: 'failure',
        error: 'email already exist',
      })
    }

    const newUser = await Users.create({ ...userData })

    const token = cryptoRandomString({ length: 16 })

    await EmailVerifications.create({
      userId: newUser.id,
      token: token,
      expiresOn: new Date(Date.now() + 60 * 60 * 24 * 1000),
    })
    await sendVerificationEmail(newUser.email, token)

    newUser.password = undefined

    const data = { ...newUser.get() }

    return res.status(201).json({ status: 'success', data })
  } catch (err) {
    return res.status(500).json({ status: 'failed', error: 'oops something went wrong' })
  }
}

/**
 * Login a new user
 * @method signinUser
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const signinUser = async (req, res) => {
  const foundUser = await Users.findOne({
    where: {
      email: req.body.email,
    },
  })

  if (!foundUser) {
    return res.status(404).json({ status: 'failure', error: 'user does not exist' })
  }

  if (!foundUser.isVerified) {
    return res.status(401).json({
      status: 'failure',
      error: 'please check your email to verify your account',
    })
  }

  const verifyUserPassword = await comparePassword(req.body.password, foundUser.password)

  if (!verifyUserPassword) {
    return res.status(401).json({ status: 'failure', error: 'email or password is incorrect' })
  }

  foundUser.password = undefined

  const payload = {
    id: foundUser.id,
    email: foundUser.email,
  }

  const token = generateToken(payload)

  const data = { ...foundUser.get(), token }

  return res
    .status(200)
    .cookie('token', generateToken(payload), {
      // maxAge: 1000 * 60 * 15,
      secure: false,
      httpOnly: true,
      // sameSite: 'lax',
    })
    .json({ status: 'success', data })
}

/**
 * verify a new user
 * @method verifyEmailToken
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const verifyEmailToken = async (req, res) => {
  const { email, token } = req.body
  const now = Date.now()

  const foundUser = await Users.findOne({ where: { email } })

  if (!foundUser) {
    return res.status(404).json({ status: 'failure', error: 'user does not exist' }) // user could not be verified
  }

  if (foundUser.isVerified === true) {
    return res.status(409).json({
      status: 'failure',
      error: 'your email has been verified already',
    })
  } else {
    const emailVerification = await EmailVerifications.findOne({
      where: { userId: foundUser.id, token: token },
    })

    if (!emailVerification) {
      return res.status(404).json({
        status: 'failure',
        error: 'email verification failed. Your token might be expired or invalid',
      })
    }

    if (now > emailVerification.expiresOn) {
      const newToken = cryptoRandomString({ length: 16 })

      emailVerification.destroy()
      await EmailVerifications.create({
        token: newToken,
        userId: foundUser.id,
        expiresOn: new Date(Date.now() + 60 * 60 * 24 * 1000),
      })
      await sendVerificationEmail(foundUser.email, newToken)

      return res.status(404).json({ status: 'failure', error: 'sorry your token has expired' })
    }

    await Users.update({ isVerified: true }, { where: { email } })
    await emailVerification.destroy()

    const verifiedUser = await Users.findOne({ where: { id: foundUser.id } })

    const payload = {
      email: verifiedUser.email,
      id: verifiedUser.id,
    }

    return res
      .status(200)
      .cookie('token', generateToken(payload), {
        // maxAge: 1000 * 60 * 15,
        secure: false,
        httpOnly: true,
        // sameSite: 'lax',
      })
      .json({
        status: 'success',
        data: verifiedUser,
      })
  }
}

/**
 * forgot password
 * @method forgotPassword
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body

  const foundUser = await Users.findOne({ where: { email } })

  if (!foundUser) {
    return res.status(404).json({
      status: 'failure',
      error: 'This user is not registered on the app, please signup',
    })
  }

  if (foundUser) {
    const addTenMinutes = moment(Date.now()).add(10, 'minutes')
    const expire = new Date(addTenMinutes)
    const token = cryptoRandomString({ length: 16 })

    await Users.update(
      {
        passwordResetToken: token,
        passwordTokenExpiry: expire,
      },
      { where: { id: foundUser.id } },
    )

    await sendForgotPasswordEmail(foundUser.email, token)

    return res.status(202).json({
      status: 'success',
      message: 'A reset token has been sent to your email address',
    })
  }
}

/**
 * reset password
 * @method resetPassword
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const resetPassword = async (req, res) => {
  const timeNow = moment()
  const { password } = req.body
  const { token } = req.query

  const foundUser = await Users.findOne({
    where: {
      passwordResetToken: token,
      passwordTokenExpiry: {
        [Op.gt]: timeNow,
      },
    },
  })

  if (!foundUser) {
    return res.status(400).json({
      status: 'failure',
      error: 'password reset token is invalid or has expired',
    })
  }

  await foundUser.update({
    password,
    passwordResetToken: null,
    passwordTokenExpiry: null,
  })

  await sendResetPasswordEmail(foundUser.email)

  return res.status(200).json({ status: 'success', message: 'password reset successful' })
}

/**
 * social login
 * @method socialLogin
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const socialLogin = async (req, res) => {
  const userData = req.user._json

  if (!userData) {
    return res.status(404).json({ status: 'failure', error: 'Resource not found' })
  }

  const firstName = userData.given_name
  const lastName = userData.family_name
  const { email } = userData
  const [{ dataValues: user }] = await Users.findOrCreate({
    where: { email },
    defaults: {
      email,
      firstName,
      lastName,
      isVerified: true,
      password: 'NULL',
    },
  })

  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified,
  }

  const token = generateToken(payload)
  user.token = token

  return res.status(200).json({ status: 'success', message: 'signin successful' })
}

/**
 * loggedIn
 * @method loggedIn
 * @param {object} req
 * @param {object} res
 * @returns {(function|object)} Function next() or JSON object
 */
export const loggedInUser = async (req, res) => {
  const token = req.cookies.token

  if (!token) return res.json({ status: false, data: null })
  return jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      return res.json({ status: false, data: null })
    }
    res.json({ status: true, data: {} })
  })
}

export default {
  signupUser,
  signinUser,
  verifyEmailToken,
  forgotPassword,
  resetPassword,
  socialLogin,
  loggedInUser,
}
