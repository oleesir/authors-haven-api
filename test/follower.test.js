/* eslint-disable */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import generateToken from '../src/helper/generateToken';
import models from '../src/database/models';
import {
	followNewUser,
	followNewUserOne,
	followNewUserTwo,
	followNewUserThree,
	nonexistingAuthor,
	emptyfollowId,
	invalidfollowId,
	unknownUserId,
} from '././helper/testData';

const { Users } = models;

const URL = '/api/v1';

describe('Followers', () => {
	let userToken;
	let userTokenOne;
	let userTokenTwo;
	let userTokenThree;
	let userId;
	let userIdOne;
	let userIdTwo;
	let userIdThree;
	before((done) => {
		request(app)
			.post(`${URL}/auth/signup`)
			.send(followNewUser)
			.end(async (err, res) => {
				const userEmail = res.body.data.email;
				userId = res.body.data.id;

				await Users.update({ isVerified: true }, { where: { id: userId } });

				const userPayload = {
					email: userEmail,
					id: userId,
				};

				userToken = await generateToken(userPayload);
				if (err) return done(err);
				done();
			});
	});

	before((done) => {
		request(app)
			.post(`${URL}/auth/signup`)
			.send(followNewUserOne)
			.end(async (err, res) => {
				const userEmailOne = res.body.data.email;
				userIdOne = res.body.data.id;

				await Users.update({ isVerified: true }, { where: { id: userIdOne } });

				const userPayload = {
					email: userEmailOne,
					id: userIdOne,
				};

				userTokenOne = await generateToken(userPayload);

				if (err) return done(err);
				done();
			});
	});

	before((done) => {
		request(app)
			.post(`${URL}/auth/signup`)
			.send(followNewUserTwo)
			.end(async (err, res) => {
				const userEmailTwo = res.body.data.email;
				userIdTwo = res.body.data.id;

				const userPayload = {
					email: userEmailTwo,
					id: userIdTwo,
				};

				userTokenTwo = await generateToken(userPayload);

				if (err) return done(err);
				done();
			});
	});

	before((done) => {
		request(app)
			.post(`${URL}/auth/signup`)
			.send(followNewUserThree)
			.end(async (err, res) => {
				const userEmailThree = res.body.data.email;
				userIdThree = res.body.data.id;

				const userPayload = {
					email: userEmailThree,
					id: userIdThree,
				};

				userTokenThree = await generateToken(userPayload);

				if (err) return done(err);
				done();
			});
	});

	describe('Follow users', () => {
		it('should follow a verified author', (done) => {
			const newUser = {
				followId: userIdOne,
			};
			request(app)
				.post(`${URL}/follow`)
				.send(newUser)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(201)
				.end((err, res) => {
					expect(res.body.data).to.have.property('id');
					expect(res.body.data).to.have.property('userId');
					expect(res.body.data).to.have.property('followId');
					expect(res.body).to.have.property('message');
					if (err) return done(err);
					done();
				});
		});

		it('should follow a verified author', (done) => {
			const newUser = {
				followId: userId,
			};
			request(app)
				.post(`${URL}/follow`)
				.send(newUser)
				.set('Authorization', `Bearer ${userTokenThree}`)
				.expect(201)
				.end((err, res) => {
					expect(res.body.data).to.have.property('id');
					expect(res.body.data).to.have.property('userId');
					expect(res.body.data).to.have.property('followId');
					expect(res.body).to.have.property('message');
					if (err) return done(err);
					done();
				});
		});

		it('should follow a verified author with the same id', (done) => {
			const newUser = {
				followId: userId,
			};
			request(app)
				.post(`${URL}/follow`)
				.send(newUser)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(403)
				.end((err, res) => {
					expect(res.body).to.have.property('error').equal('you cannot follow yourself');
					if (err) return done(err);
					done();
				});
		});

		it('should follow an unverified author', (done) => {
			const newUser = {
				followId: userIdTwo,
			};
			request(app)
				.post(`${URL}/follow`)
				.send(newUser)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').equal('user is not verified');
					if (err) return done(err);
					done();
				});
		});

		it('should not follow an unverified author', (done) => {
			const newUser = {
				followId: userIdTwo,
			};
			request(app)
				.post(`${URL}/follow`)
				.send(newUser)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').equal('user is not verified');
					if (err) return done(err);
					done();
				});
		});

		it('should not follow an unexisting author', (done) => {
			request(app)
				.post(`${URL}/follow`)
				.send(nonexistingAuthor)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(404)
				.end((err, res) => {
					expect(res.body).to.have.property('error').equal('user does not exist on the app');
					if (err) return done(err);
					done();
				});
		});

		it('should not follow an author without a token', (done) => {
			request(app)
				.post(`${URL}/follow`)
				.send(nonexistingAuthor)
				.set('Authorization', `Bearer ${''}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').equal('please provide a token');
					if (err) return done(err);
					done();
				});
		});

		it('should not follow an author with an empty folowerId field ', (done) => {
			request(app)
				.post(`${URL}/follow`)
				.send(emptyfollowId)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(400)
				.end((err, res) => {
					expect(res.body.error).to.have.property('followId').equal('followId field cannot be left blank');
					if (err) return done(err);
					done();
				});
		});

		it('should not follow an author with an invalid followId  ', (done) => {
			request(app)
				.post(`${URL}/follow`)
				.send(invalidfollowId)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(400)
				.end((err, res) => {
					expect(res.body.error).to.have.property('followId').equal('invalid id');
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Get following', () => {
		it('should get authors the user is following', (done) => {
			request(app)
				.get(`${URL}/follow/following`)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.have.property('status').equal('success');
					if (err) return done(err);
					done();
				});
		});

		it('should get followers of the author', (done) => {
			request(app)
				.get(`${URL}/follow/followers`)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.have.property('status').equal('success');
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Unfollow user', () => {
		it('should unfollow a verified author', (done) => {
			request(app)
				.delete(`${URL}/follow/${userIdOne}`)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.have.property('message').to.eql('successfully unfollowed author');
					if (err) return done(err);
					done();
				});
		});

		it('should not allow unfollow an author without a token', (done) => {
			request(app)
				.delete(`${URL}/follow/${userIdOne}`)
				.set('Authorization', `Bearer ${''}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').to.equal('please provide a token');
					if (err) return done(err);
					done();
				});
		});

		it('should not allow unfollow an author without a token', (done) => {
			request(app)
				.delete(`${URL}/follow/${userIdOne}`)
				.set('Authorization', `Bearer ${''}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').to.equal('please provide a token');
					if (err) return done(err);
					done();
				});
		});

		it('should not allow an author to unfollow an unexisting author', (done) => {
			request(app)
				.delete(`${URL}/follow/${unknownUserId}`)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(404)
				.end((err, res) => {
					expect(res.body).to.have.property('error').to.equal('user does not exist on the app');
					if (err) return done(err);
					done();
				});
		});
	});
});
