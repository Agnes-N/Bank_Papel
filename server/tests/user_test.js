import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import users from '../models/testUser';

chai.should();
chai.use(chaiHttp);

describe('test signup', () => {
  it('user should signup', (done) => {
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
        expect(res).to.have.status(409);
        done();
      });
  });

  it('email should not be empty, enter your email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('email is not valid email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('name must contain alpha-numeric characters only', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[4])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('password should not be empty, enter the password', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(users[5])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
