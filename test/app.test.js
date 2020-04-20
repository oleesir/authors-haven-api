import request from 'supertest';
import app from '../server/src/app';

describe('app', () => {
  it('should display authors', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Authors Haven API');
        if (err) return done(err);
        done();
      });
  });
});
