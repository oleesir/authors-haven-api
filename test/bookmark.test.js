/* eslint-disable */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../server/src/app';
import model from '../server/src/database/models';

const URL = '/api/v1';

import {
userToken,
bookmarkArticle,
getBookmarkId,
userTokenThree,
deleteBookmarkId
} from './helper/testData';

const{Bookmarks} = model

describe('Bookmarks',()=>{

  describe('create bookmark',()=>{
    it('should bookmark an article for a verified author', (done) => {
      request(app)
        .post(`${URL}/bookmarks`)
        .send( bookmarkArticle)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('articleId');
          expect(res.body.data).to.have.property('userId');
          if (err) return done(err);
          done();
        });
    })
  })

  describe('get bookmark',()=>{
    it('should get a bookmark an article for a verified author', (done) => {
      request(app)
        .get(`${URL}/bookmarks/${getBookmarkId}`)
        .set('Authorization', `Bearer ${userTokenThree}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('articleId');
          expect(res.body.data).to.have.property('userId');
          if (err) return done(err);
          done();
        });
    })

    it('should get all bookmarked article for a verified author', (done) => {
      request(app)
        .get(`${URL}/bookmarks`)
        .set('Authorization', `Bearer ${userTokenThree}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').eql('success');
          if (err) return done(err);
          done();
        });
    })
  })

  describe('delete bookmark',()=>{
    it('should get a bookmark an article for a verified author', (done) => {
      request(app)
        .delete(`${URL}/bookmarks/${deleteBookmarkId}`)
        .set('Authorization', `Bearer ${userTokenThree}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message').to.eql('the article has been removed from bookmark successfully');
          if (err) return done(err);
          done();
        });
    })
  })
})
