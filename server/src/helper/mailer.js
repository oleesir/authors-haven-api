import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  },
};
const transporter = nodemailer.createTransport(mg(auth));

const Mailer = {
  /**
   * Sends mails
   *
   * @param {Array<string> | string} to
   * @param {string} subject
   * @param {string} html
   *
   * @returns {void}
   */
  async send({ to, subject, text }) {
    try {
      await transporter.sendMail({
        from: 'mailgun@sandbox08e7297d7ce5435da31d1a71ac92eb5d.mailgun.org',
        to,
        subject,
        text
      });
    } catch (error) {
      Promise.reject(new Error(`Error sending mail(s) to ${to} - ${error}`));
    }
  },
};

export default Mailer;
