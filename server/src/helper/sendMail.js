import Mailer from './mailer';

const { FRONTEND_URL } = process.env;

const sendVerificationEmail = (email, token) => {
  Mailer.send({
    to: email,
    subject: 'Confirm Email',
    text: `Please click this link to confirm your email: ${FRONTEND_URL}/verification?token=${token}&email=${email}`
  });
};

const sendForgotPasswordEmail = (email, token) => {
  Mailer.send({
    to: email,
    subject: 'Reset Password',
    text: `Please click this link to reset your password: ${FRONTEND_URL}/forgotPassword?token=${token}&email=${email}`
  });
};

const sendResetPasswordEmail = (email) => {
  Mailer.send({
    to: email,
    subject: 'Reset Password Confirmation',
    text: 'Your password has been successful reset, you can now login with your new password'
  });
};


export { sendVerificationEmail, sendForgotPasswordEmail, sendResetPasswordEmail };
