/* eslint-disable */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

const URL = '/api/v1';

describe('User Search', () => {
	describe('Search Users', () => {
		it('should return result from matching users table', (done) => {
			const key = 'lee';
			request(app)
				.get(`${URL}/users/search?keyword=${key}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body.data[0]).to.have.property('firstName');
					expect(res.body.data[0]).to.have.property('lastName');
					expect(res.body.data).to.be.a('array');
					if (err) return done(err);
					done();
				});
		});
	});
});
