/* eslint-disable */
import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../server/src/app';
import generateToken from '../server/src/helper/generateToken';
import models from '../server/src/database/models';

const{ Users, Articles  } = models;

import {
  newArticle,
  userArticle,
  emptyTitle,
  oneTitle,
  wrongArticleId,
  anotherToken,
  newArticle1,
  updatedArticle,
  nonexistingArticle,
  wrongArticleId1,
  emptyTitleUpdate,
  wrongTypeUpdate,
  newArticleWrongType,
  wrongupdateArticleId,
  articleToDelete,
  nonexistingArticleId,
  userIdTwo,
  userTokenTwo
  } from '././helper/testData';

const URL = '/api/v1';

describe('Articles', ()=> {

  let userId;
  let userToken;
  let userEmail;
  let expiredToken;
 

  before((done) => {
   
    request(app)
      .post(`${URL}/auth/signup`)
      .send(userArticle)
      .end(async (err, res) => {

        userEmail = res.body.data.email;
        userId = res.body.data.id;
       

        await Users.update(
          { isVerified: true },
          { where: { id: userId } }
        );

        const userPayload = {
          email: userEmail,
          id: userId
        };

        userToken = generateToken(userPayload);
        
        done();
      });
  });
  
  describe('Create article', () => {
    it('should create an article for a verified author', (done) => {
      request(app)
        .post(`${URL}/articles`)
        .send(newArticle)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(201)
        .end((err, res) => {
           expect(res.body.data).to.have.property('id');
           expect(res.body.data).to.have.property('status');
           expect(res.body.data).to.have.property('body');
           expect(res.body.data).to.have.property('userId');
          if (err) return done(err);
          done();
        });
    })

    it('should not create an article with an empty token', (done) => {
      request(app)
        .post(`${URL}/articles`)
        .send(newArticle)
        .set('Authorization', `Bearer ${''}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('please provide a token');
          if (err) return done(err);
          done();
        });
    })

    it('should not create an article with an empty title', (done) => {
      request(app)
        .post(`${URL}/articles`)
        .send(emptyTitle)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('title').to.equal('title field cannot be left blank');
          if (err) return done(err);
          done();
        });
    })

    it('should not create an article with a wrong status', (done) => {
      request(app)
        .post(`${URL}/articles`)
        .send(newArticleWrongType )
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('status').to.equal('status can either be published or draft');
          if (err) return done(err);
          done();
        });
    })

    it('should create an article with one character', (done) => {
      request(app)
        .post(`${URL}/articles`)
        .send(oneTitle)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('title').to.equal('name should be be at least 2 characters');
          if (err) return done(err);
          done();
        });
    })

    it('should create an article with an invalid token', (done) => {
      request(app)
        .post(`${URL}/articles`)
        .send(oneTitle)
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('Invalid token');
          if (err) return done(err);
          done();
        });
    })
 
  })

  describe('Get articles',()=>{
    let articleId;
      
          before((done) => {
            request(app)
              .post(`${URL}/articles`)
              .send(newArticle)
              .set('Authorization', `Bearer ${userToken}`)
              .end(async (err, res) => {
                articleId = res.body.data.id;

                 await Articles.update(
                  { status: 'published' },
                  { where: { id: articleId }, returning: true }
                );

                if (err) return done(err);
                done();
              });
          });
      
    describe('Get an article', () => {
      
          it('should get an article for a verified author', (done) => {
            request(app)
              .get(`${URL}/articles/${articleId}`)
              .set('Authorization', `Bearer ${userToken}`)
              .expect(200)
              .end((err, res) => {
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('status');
                expect(res.body.data).to.have.property('body');
                expect(res.body.data).to.have.property('userId');
                if (err) return done(err);
                done();
              });
          })

          it('should get an article with an empty token', (done) => {
            request(app)
              .get(`${URL}/articles/${articleId}`)
              .set('Authorization', `Bearer ${''}`)
              .expect(401)
              .end((err, res) => {
                expect(res.body).to.have.property('error').to.equal('please provide a token');
                if (err) return done(err);
                done();
              });
          })
      
          it('should not get an article that does not belong to an Author', (done) => {
            request(app)
              .get(`${URL}/articles/${articleId}`)
              .set('Authorization', `Bearer ${anotherToken}`)
              .expect(404)
              .end((err, res) => {
                expect(res.body).to.have.property('error').equal('article does not exist');
                if (err) return done(err);
                done();
              });
          })
      
          it('should not get an article with a wrong uuid', (done) => {
            request(app)
              .get(`${URL}/articles/${wrongArticleId}`)
              .set('Authorization', `Bearer ${anotherToken}`)
              .expect(400)
              .end((err, res) => {
               expect(res.body.error).to.have.property('id').equal('invalid id')
                if (err) return done(err);
                done();
              });
          })
        })
      
        describe('Get all article',()=> {

          it('should get all articles for an author', (done) => {
            request(app)
              .get(`${URL}/articles`)
              .set('Authorization', `Bearer ${userToken}`)
              .expect(200)
              .end((err, res) => {
                expect(res.body).to.have.property('status').eql('success');
                if (err) return done(err);
                done();
              });
          })
      
          it('should get all articles for a verified author', (done) => {
            request(app)
              .get(`${URL}/users/${userIdTwo}/articles?status=${'published'}`)
              .set('Authorization', `Bearer ${ userTokenTwo}`)
              .expect(200)
              .end((err, res) => {
                expect(res.body).to.have.property('status').eql('success');
                if (err) return done(err);
                done();
              });
          })

           
          it('should get all draft articles for a verified author', (done) => {
            request(app)
              .get(`${URL}/articles?status=${'draft'}`)
              .set('Authorization', `Bearer ${userToken}`)
              .expect(200)
              .end((err, res) => {
                expect(res.body).to.have.property('status').eql('success');
                if (err) return done(err);
                done();
              });
          })
        })
  })

  describe('Update articles', () => {
    let articleIdToUpdate
    
    before((done) => {
      request(app)
        .post(`${URL}/articles`)
        .set('Authorization', `Bearer ${userToken}`)
        .send( newArticle1)
        .end( (err, res) => {
          articleIdToUpdate = res.body.data.id;
        
          if (err) return done(err);
          done();
        });
    });

    it('should update an article', (done) => {
      request(app)
        .patch(`${URL}/articles/${articleIdToUpdate}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updatedArticle)
        .expect(200)
        .end((err, res) => {
           expect(res.body).to.have.property('status').eql('success');
           expect(res.body.data).to.have.property('id').to.equal(articleIdToUpdate);
          if (err) return done(err);
          done();
        });
    });

    it('should not update an article that does not exist', (done) => {
      request(app)
        .patch(`${URL}/articles/${wrongArticleId1}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(nonexistingArticle)
        .expect(404)
        .end((err, res) => {
           expect(res.body).to.have.property('error').to.equal('article does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not update an article with an empty title', (done) => {
      request(app)
        .patch(`${URL}/articles/${articleIdToUpdate}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send( emptyTitleUpdate)
        .expect(400)
        .end((err, res) => {
           expect(res.body.error).to.have.property('title').to.equal('title field cannot be left blank');
          if (err) return done(err);
          done();
        });
    });

    it('should not update an article with an empty token', (done) => {
      request(app)
        .patch(`${URL}/articles/${articleIdToUpdate}`)
        .set('Authorization', `Bearer ${''}`)
        .send( updatedArticle )
        .expect(401)
        .end((err, res) => {
           expect(res.body).to.have.property('error').to.equal('please provide a token');
          if (err) return done(err);
          done();
        });
    });

    it('should not update an article with a wrong status ', (done) => {
      request(app)
        .patch(`${URL}/articles/${articleIdToUpdate}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send( wrongTypeUpdate )
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('status').to.equal('status can either be published or draft');
          if (err) return done(err);
          done();
        });
    });

    it('should not update an article with an invalid uuid ', (done) => {
      request(app)
        .patch(`${URL}/articles/${wrongupdateArticleId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send( updatedArticle )
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).to.have.property('id').to.equal('invalid id');
          if (err) return done(err);
          done();
        });
    });

  })

  describe('Delete articles',() => {
    let articleIdToDelete
    
    before((done) => {
      request(app)
        .post(`${URL}/articles`)
        .set('Authorization', `Bearer ${userToken}`)
        .send( articleToDelete)
        .end( (err, res) => {
          articleIdToDelete = res.body.data.id;

          if (err) return done(err);
          done();
        });
    });

    it('should allow an author to delete an article', (done) => {
      request(app)
        .delete(`${URL}/articles/${articleIdToDelete}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message').to.eql('article was deleted successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow an author to delete an article without a token', (done) => {
      request(app)
        .delete(`${URL}/articles/${articleIdToDelete}`)
        .set('Authorization', `Bearer ${''}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('please provide a token');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow an author to delete a non existing article', (done) => {
      request(app)
        .delete(`${URL}/articles/${ nonexistingArticleId }`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error').to.equal('article does not exist');
          if (err) return done(err);
          done();
        });
    });
  })
 
})
