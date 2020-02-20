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

describe('Test login', () => {
  it('user should login', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send(users[6])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('email is not valid', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send(users[7])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('email should not be empty', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send(users[8])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('password should not be empty', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send(users[9])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('email not found', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send(users[10])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('user accounts by email', () => {
  it('SHOW ALL USER ACCOUNTS', (done) => {
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .get('/user/agnes@gmail.com/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('SHOULD  NOT SHOW', (done) => {
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .get('/user/agbvbv@gmail.com/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test create account', () => {
  it('user should create account', (done) => {
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .post('/accounts')
      .set('Authorization', token)
      .send(users[11])
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('type should be savings or current', (done) => {
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .post('/accounts')
      .set('Authorization', token)
      .send(users[12])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test specific user account', () => {
  it('user can view a specific account', (done) => {
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .get('/accounts/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('account number is not found', (done) => {
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .get('/accounts/4')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
