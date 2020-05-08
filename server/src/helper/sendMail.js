import Mailer from './mailer';

const { FRONTEND_URL } = process.env;

const sendVerificationEmail = (email, token) => {
  Mailer.send({
    to: email,
    subject: 'Confirm Email',
    text: `Please click this email to confirm your email: ${FRONTEND_URL}/verification?token=${token}&email=${email}`
  });
};

export default sendVerificationEmail;
