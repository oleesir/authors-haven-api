/* eslint-disable */
import '@babel/polyfill';
import moment from 'moment';
import request from 'supertest';
import app from '../server/src/app';
import Mailer from '../server/src/helper/mailer';
import model from '../server/src/database/models'

const{ EmailVerifications  } = model;

import {
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
  invalidEmailToken
} from './helper/testData';

const URL = '/api/v1/auth';

describe('AuthRoutes', () => {
 let userId;
 let userEmail;

  describe('SignupRoute', () => {
    it('should signup new user', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          userId = res.body.data.id;
          userEmail = res.body.data.email
          expect(res.status).toBe(201);
          expect(res.body.data).toHaveProperty('firstName');
          expect(res.body.data).toHaveProperty('lastName');
          expect(res.body.data).toHaveProperty('email');
          expect(Mailer.send).toHaveBeenCalled();
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
          expect(res.status).toBe(400);
          expect(res.body.error.firstName).toBe('name should be between 2 to 30 characters');
          expect(res.body.error.lastName).toBe('name should be between 2 to 30 characters');
          expect(res.body.error.email).toBe('enter a valid email address');
          expect(res.body.error.password).toBe('password should be between 8 to 15 characters');
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
          expect(res.body.error.firstName).toBe('name should be between 2 to 30 characters');
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
          expect(res.body.error.lastName).toBe('name should be between 2 to 30 characters');
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
          expect(res.body.error.email).toBe('enter a valid email address');
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
          expect(res.body.error.password).toBe('password should be between 8 to 15 characters');
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
          expect(res.body.error.firstName).toBe('name should contain only alphabets');
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
          expect(res.body.error.firstName).toBe('name should contain only alphabets');
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
          expect(res.body.error.lastName).toBe('name should contain only alphabets');
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
          expect(res.body.error.lastName).toBe('name should contain only alphabets');
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
          expect(res.body.error.email).toBe('enter a valid email address');
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
          expect(res.body.error.password).toBe('password should be between 8 to 15 characters');
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
          expect(res.body.error.password).toBe('password should be between 8 to 15 characters');
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
          expect(res.body.error).toBe('User with that email already exists');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Verification Routes', () => {
    let userToken;
    let userEmailVerification;
    const fiveMinutesAgo = moment(Date.now()).subtract(5, 'minutes');
   

    beforeAll(async () => {
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
      const previousToken = userEmailVerification.token;
      expect(userEmailVerification.expiresOn).toEqual(new Date(fiveMinutesAgo));

      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${userEmail}`)
        .expect(404)
        .end(async (err, res) => {
          expect(res.body.error).toBe('sorry your token has expired');

          // check that expiry and token are different
          userEmailVerification = await EmailVerifications.findOne({
            where: {
              userId
            }
          });

          userToken = userEmailVerification.token;

          expect (userEmailVerification.expiresOn).not.toBe(new Date(fiveMinutesAgo));
          expect (userToken).not.toBe(previousToken);

          if (err) return done(err);
          done();
        });
    });


    it('should not verify a user with an invalid token', (done) => {
      request(app)
        .get(`${URL}/verification?token=${invalidEmailToken}&email=${userEmail}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body.error).toBe('email verification failed. Your token might be expired or invalid');
          if (err) return done(err);
          done();
        });
    });

    it('should verify a user with a valid verification token', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${userEmail}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe('email has been successfully verified');
          if (err) return done(err);
          done();
        });
    });

    it('should not reverify a user who has already been verified', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${userEmail}`)
        .expect(409)
        .end((err, res) => {
          expect(res.body.error).toBe('your email has been verified already');
          if (err) return done(err);
          done();
        });
    });

    it('should not verify a user who does not exist on the platform', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${unexistingUserEmail}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body.error).toBe('user does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not verify a user who does not exist on the platform', (done) => {
      request(app)
        .get(`${URL}/verification?token=${userToken}&email=${unexistingUserEmail}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body.error).toBe('user does not exist');
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
          expect(res.status).toBe(200);
          expect(res.body.data).toHaveProperty('firstName');
          expect(res.body.data).toHaveProperty('lastName');
          expect(res.body.data).toHaveProperty('email');
          expect(res.body.data).toHaveProperty('token');
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
          expect(res.status).toBe(400);
          expect(res.body.error.email).toBe('enter a valid email address');
          expect(res.body.error.password).toBe('password should be between 8 to 15 characters');
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
          expect(res.status).toBe(400);
          expect(res.body.error.email).toBe('enter a valid email address');
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
          expect(res.status).toBe(400);
          expect(res.body.error.password).toBe('password should be between 8 to 15 characters');
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
          expect(res.status).toBe(404);
          expect(res.body.error).toBe('user does not exist');
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
          expect(res.status).toBe(401);
          expect(res.body.error).toBe('email or password is incorrect');
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
          expect(res.status).toBe(400);
          expect(res.body.error.email).toBe('enter a valid email address');
          if (err) return done(err);
          done();
        });
    });
  });
});
