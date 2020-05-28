/* eslint-disable */
import '@babel/polyfill';
import moment from 'moment';
import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import app from '../server/src/app';
import Mailer from '../server/src/helper/mailer';
import authController from '../server/src/controllers/auth.controller'
import model from '../server/src/database/models';

const{ EmailVerifications,Users  } = model;

import {
  req,
  newUser,
  emptyUser,
  emptyFirstName,
  emptyLastName,
  emptyEmail,
  emptyPassword,
  nonAlphabetFirstName,
  nonAlphabetLastName,
  invalidEmail,
  invalidPassword,
  existingEmail,
  authUser,
  emptyAuthUser,
  emptyEmailAuthUser,
  emptyPasswordAuthUser,
  wrongEmail,
  wrongPassword,
  wrongEmailAuthUser,
  unexistingUserEmail,
  invalidEmailToken,
  forgetPasswordEmail,
  nonExistingforgetPasswordEmail,
  invalidForgetPasswordEmail,
  resetPasswordEmail,
  emptyResetPasswordEmail,
  invalidResetPasswordEmail,
  unverifiedNewUser,
  unverifiedAuthUser
} from './helper/testData';

const URL = '/api/v1/auth';

describe('AuthRoutes', () => {
 let userId;
 let userEmail;

  describe('SignupRoute', () => {
    it('should signup new user', (done) => {
      const sendMailStub = sinon.stub(Mailer, 'send');
       request(app)
        .post(`${URL}/signup`)
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          const sendMailStubArgs = sendMailStub.getCall(0).args[0];
          sinon.assert.calledOnce(sendMailStub);
          userId = res.body.data.id;
          userEmail = res.body.data.email
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('role');
          expect(sendMailStubArgs.subject).to.equal('Confirm Email');
          expect(sendMailStubArgs.text).to.contain('&email=ryan@gmail.com');
          expect(sendMailStubArgs.to).to.equal('ryan@gmail.com');
          sinon.restore();
          if (err) return done(err);
          done();
      });
    });

    it('should not register a new user with empty input fields', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('firstName').equal('firstName field cannot be left blank');
          expect(res.body.error).to.have.property('lastName').equal('lasttName field cannot be left blank');
          expect(res.body.error).to.have.property('email').equal('email field cannot be left blank');
          expect(res.body.error).to.have.property('password').equal('password field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an empty first name field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('firstName').equal('firstName field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an empty last name field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyLastName)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('lastName').equal('lasttName field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with an empty email field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('email').equal('email field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an empty password field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('password').equal('password field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with a non-alphabet firstName field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('firstName').equal('name should contain only alphabets');
          if (err) return done(err);
          done();
        });
    });
    it('should not register a new user with a non-alphabet firstName field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('firstName').equal('name should contain only alphabets');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with a non-alphabet lastName field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetLastName)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('lastName').equal('name should contain only alphabets');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an invalid email field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(invalidEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('email').equal('enter a valid email address');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an invalid password length field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(invalidPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('password').equal('password should be a minimum of 8 characters');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an already existing email', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(existingEmail)
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('User with that email already exists');
          if (err) return done(err);
          done();
        });
      });
  });

  describe('Verification Routes', () => {
   
    let userToken;
    let userEmailVerification;
    const fiveMinutesAgo = moment(Date.now()).subtract(5, 'minutes');


    before(async () => {
      userEmailVerification = await EmailVerifications.findOne({
        where: {
          userId
        }
      });

      userToken = userEmailVerification.token;

      // expire token
      await userEmailVerification.update({
        expiresOn: fiveMinutesAgo
      })
    });



    it(`should not verify a user with an expired token
        and should create another token after deleting the previous one`, (done) => {
          const sendMailStub = sinon.stub(Mailer, 'send');
      const previousToken = userEmailVerification.token;
      expect(userEmailVerification.expiresOn).to.eql(new Date(fiveMinutesAgo));

      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${userEmail}`)
        .expect(404)
        .end(async (err, res) => {
          const sendMailStubArgs = sendMailStub.getCall(0).args[0];
          sinon.assert.calledOnce(sendMailStub);
          expect(res.body).to.have.property('error').to.equal('sorry your token has expired');

          // check that expiry and token are different
          userEmailVerification = await EmailVerifications.findOne({
            where: {
              userId
            }
          });

          userToken = userEmailVerification.token;

          expect (userEmailVerification.expiresOn).to.not.equal(new Date(fiveMinutesAgo));
          expect (userToken).to.not.equal(previousToken);
          expect(sendMailStubArgs.subject).to.equal('Confirm Email');
          expect(sendMailStubArgs.text).to.contain('&email=ryan@gmail.com');
          expect(sendMailStubArgs.to).to.equal('ryan@gmail.com');
          sinon.restore();

          if (err) return done(err);
          done();
        });
    });


    it('should not verify a user with an invalid token', (done) => {
      request(app)
        .get(`${URL}/verification?token=${invalidEmailToken}&email=${userEmail}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('email verification failed. Your token might be expired or invalid');
          if (err) return done(err);
          done();
        });
    });

    it('should verify a user with a valid verification token', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${userEmail}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message').to.equal('email has been successfully verified');
          if (err) return done(err);
          done();
        });
    });

    it('should not reverify a user who has already been verified', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${userEmail}`)
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('your email has been verified already');
          if (err) return done(err);
          done();
        });
    });

    it('should not verify a user who does not exist on the platform', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${unexistingUserEmail}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('user does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an already existing email', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(existingEmail)
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('User with that email already exists');
          if (err) return done(err);
          done();
        });
    });

  });

describe('Login Routes', () => {
    it('should log in an existing user ', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(authUser)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('email');
          expect(res.body.data).to.have.property('role');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with empty email and password fields', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(emptyAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('email').equal('email field cannot be left blank');
          expect(res.body.error).to.have.property('password').equal('password field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with empty email field', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(emptyEmailAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('email').equal('email field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });


    it('should not log in a user with empty password field', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(emptyPasswordAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('password').equal('password field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with wrong details', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(wrongEmail)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('user does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a user with wrong details', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(wrongPassword)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('email or password is incorrect');
          if (err) return done(err);
          done();
        });
    });

    it('should not log in a new user with an invalid email', (done) => {
      request(app)
        .post(`${URL}/signin`)
        .send(wrongEmailAuthUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('email').equal('enter a valid email address');
          if (err) return done(err);
          done();
        });
    });

  
  });

  describe('Password Routes',()=>{
    describe('ForgotPassword Route',()=> {
      it('should send reset password mail', (done) => {
        const sendMailStub = sinon.stub(Mailer, 'send');
        request(app)
          .post(`${URL}/forgotPassword`)
          .send(forgetPasswordEmail)
          .expect(202)
          .end((err, res) => {
            const sendMailStubArgs = sendMailStub.getCall(0).args[0];
           sinon.assert.calledOnce(sendMailStub);
            expect(res.body.message).to.equal('A reset token has been sent to your email address');
            expect(sendMailStubArgs.subject).to.equal('Reset Password');
            expect(sendMailStubArgs.text).to.contain('&email=ryan@gmail.com');
            expect(sendMailStubArgs.to).to.equal('ryan@gmail.com');
            if (err) return done(err);
            done();
          });
      });

      it('should not send reset password mail to none existing user', (done) => {
        request(app)
          .post(`${URL}/forgotPassword`)
          .send(nonExistingforgetPasswordEmail)
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.have.property('error').equal('This user is not registered on the app, please signup')
            if (err) return done(err);
            done();
          });
      });

      it('should return validation errors for invalid email', (done) => {
        request(app)
          .post(`${URL}/forgotPassword`)
          .send(invalidForgetPasswordEmail )
          .expect(400)
          .end((err, res) => {
            expect(res.body.error).to.have.property('email').equal('enter a valid email address')
            if (err) return done(err);
            done();
          });
      });

    })

    describe('ResetPassword Route',()=> {
      let email
      let users
      let resetToken
      const oneHourAgo = moment(Date.now()).subtract(60, 'minutes');

      before(async () => {
        users = await Users.findOne({
          where: {
            email:'ryan@gmail.com'
          }
        });

        resetToken = users.passwordResetToken;

      });

      it('should reset password and sends reset password successful mail', (done) => {
        request(app)
          .post(`${URL}/resetPassword?token=${resetToken}`)
          .send(resetPasswordEmail)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('message').equal('password reset successful');
            if (err) return done(err);
            done();
          });
      });

      it('should not reset password for invalid/expired token', (done) => {
        request(app)
        .post(`${URL}/resetPassword?token=${resetToken}`)
        .send(resetPasswordEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('password reset token is invalid or has expired');
          if (err) return done(err);
          done();
        });
      });

      it('should return validation errors when no password is provided', (done) => {
        request(app)
        .post(`${URL}/resetPassword?token=${resetToken}`)
        .send(emptyResetPasswordEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('password').equal('password field cannot be left blank');
          if (err) return done(err);
          done();
        });
      });


      it('should return validation errors for invalid password', (done) => {
        request(app)
        .post(`${URL}/resetPassword?token=${resetToken}`)
        .send(invalidResetPasswordEmail)
        .expect(400)
        .end((err, res) => {
        expect(res.body.error).to.have.property('password').equal('password should be a minimum of 8 characters');
          if (err) return done(err);
          done();
        });
      });
  });
});

describe('Social Login',()=>{
  
  const mock404 = () => {
    const res = {};
    res.status = () => 404;
    res.json = () => ({ status: 'failure', error: 'Resource not found' });
    return res;
  };

  const mock200 = () => {
    const res = {};
    res.status = () => 200;
    res.json = () => ({
      user: {
        id: 1,
        firstName: 'ryan',
        lastName: 'gosling',
        email: 'ryan@gmail.com',
      }
    });
    return res;
  };

  it('should return 404 if user not found on request object', async () => {
    const req = {};
    sinon.stub(authController, 'socialLogin').returns(mock404());
    const result = await authController.socialLogin(req, {}, () => ({}));
    expect(result.status()).to.eql(404);
    expect(result.json().error).to.eql('Resource not found');
    authController.socialLogin.restore();
  });

  it('should return 200 on successful login', async () => {
    sinon.stub(authController, 'socialLogin').returns(mock200());
    const result = await authController.socialLogin(req, {}, () => ({}));
    expect(result.status()).to.eql(200);
    expect(result.json().user.firstName).to.eql('ryan');
    expect(result.json().user.lastName).to.eql('gosling');
    expect(result.json().user.email).to.eql('ryan@gmail.com');
    authController.socialLogin.restore();
  });
})
});
