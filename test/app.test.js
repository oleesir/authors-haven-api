import request from 'supertest';
import { expect } from 'chai';
import app from '../server/src/app';

describe('app', () => {
  it('should display Authors haven app', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Authors Haven API');
        if (err) return done(err);
        done();
      });
  });

  it('Should return a 404 error if page is not found', (done) => {
    request(app)
      .get('/unknown-route')
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('Not found');
        if (err) return done(err);
        done();
      });
  });
});
