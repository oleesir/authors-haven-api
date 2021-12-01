/* eslint-disable */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

const URL = '/api/v1';

describe('Tag Search', () => {
	describe('Search Tags', () => {
		it('should return result from matching tags table', (done) => {
			const key = 'javascript';
			request(app)
				.get(`${URL}/tags/search?keyword=${key}`)
				.expect(200)
				.end((err, res) => {
					expect(res.body.data[0]).to.have.property('id');
					expect(res.body.data[0]).to.have.property('name');
					expect(res.body.data).to.be.a('array');
					if (err) return done(err);
					done();
				});
		});
	});
});
