import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';

chai.should();
chai.use(chaiHttp);

describe('test signup', () => {
  it('you must login', (done) => {
    chai.request(app)
      .get('/user/agnes@gmail.com/accounts')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
