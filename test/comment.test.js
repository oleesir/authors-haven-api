/* eslint-disable */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import generateToken from '../server/src/helper/generateToken';
import models from '../server/src/database/models';
import {
	userComment,
	newArticle,
	newReplyComment,
	userCommentOne,
	updateReplyComment,
	newComment,
	leeUpdateToken,
	updateId,
	getArticleWithComments,
	getRepliesToComment,
	deleteComment,
	deleteToken,
	userToken,
	commentId,
} from './helper/testData';

const { Users } = models;

const URL = '/api/v1';

describe('Comments', () => {
	describe('Create comment', () => {
		it('should create a comment for an article', (done) => {
			request(app)
				.post(`${URL}/comments`)
				.send(newComment)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(201)
				.end((err, res) => {
					expect(res.body.data).to.have.property('id');
					expect(res.body.data).to.have.property('repliedTo');
					expect(res.body.data).to.have.property('articleId');
					expect(res.body.data).to.have.property('body');
					expect(res.body.data).to.have.property('userId');
					if (err) return done(err);
					done();
				});
		});

		it('should not create a comment with an empty token', (done) => {
			request(app)
				.post(`${URL}/comments`)
				.send(newComment)
				.set('Authorization', `Bearer ${''}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').to.equal('please provide a token');
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Create reply to a comment', () => {
		it('should reply a comment', (done) => {
			request(app)
				.post(`${URL}/comments/${commentId}/replies`)
				.send(newReplyComment)
				.set('Authorization', `Bearer ${userToken}`)
				.expect(201)
				.end((err, res) => {
					expect(res.body.data).to.have.property('id');
					expect(res.body.data).to.have.property('repliedTo');
					expect(res.body.data).to.have.property('articleId');
					expect(res.body.data).to.have.property('body');
					expect(res.body.data).to.have.property('userId');
					if (err) return done(err);
					done();
				});
		});

		it('should not reply a comment with an empty token', (done) => {
			request(app)
				.post(`${URL}/comments/${commentId}/replies`)
				.send(newReplyComment)
				.set('Authorization', `Bearer ${''}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').to.equal('please provide a token');
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Update a comment', () => {
		it('should update a comment', (done) => {
			request(app)
				.patch(`${URL}/comments/${updateId}`)
				.send(updateReplyComment)
				.set('Authorization', `Bearer ${leeUpdateToken}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body.data).to.have.property('id');
					expect(res.body.data).to.have.property('repliedTo');
					expect(res.body.data).to.have.property('articleId');
					expect(res.body.data).to.have.property('body');
					expect(res.body.data).to.have.property('userId');
					if (err) return done(err);
					done();
				});
		});

		it('should not reply a comment with an empty token', (done) => {
			request(app)
				.patch(`${URL}/comments/${updateId}`)
				.send(updateReplyComment)
				.set('Authorization', `Bearer ${''}`)
				.expect(401)
				.end((err, res) => {
					expect(res.body).to.have.property('error').to.equal('please provide a token');
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Get comments', () => {
		it('should get article with comments', (done) => {
			request(app)
				.get(`${URL}/comments/articles/${getArticleWithComments}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.have.property('status').equal('success');
					if (err) return done(err);
					done();
				});
		});

		it('should get replies to comments', (done) => {
			request(app)
				.get(`${URL}/comments/${getRepliesToComment}/replies`)
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.have.property('status').equal('success');
					if (err) return done(err);
					done();
				});
		});
	});

	describe('Delete comment', () => {
		it('should delete a comment', (done) => {
			request(app)
				.delete(`${URL}/comments/${deleteComment}`)
				.set('Authorization', `Bearer ${deleteToken}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body).to.have.property('message').equal('successfully deleted comment');
					if (err) return done(err);
					done();
				});
		});
	});
});
