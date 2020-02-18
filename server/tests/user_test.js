import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import users from '../models/testUser';

chai.should();
chai.use(chaiHttp);

describe('test signup', () => {
  it('should signup a user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('email already exists', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not be empty, enter your email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('could not signup, you should enter a valid email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('could not signup, name must contain alpha numeric characters', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[4])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('could not signup, you shoud enter your password', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[5])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
