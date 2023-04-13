import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('test POST /login', () => {
  afterEach(sinon.restore)
    it ('if error message is sent when email address is left empty', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({})
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.be.deep.equal({
        message: 'All fields must be filled'
      })
    })

    it ('if error message is sent when password is left empty', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'mockmail@mockmail.com'
        })
      expect(httpResponse.status).to.be.equal(400)
      expect(httpResponse.body).to.be.deep.equal({
        message: 'All fields must be filled'
      })
    })

    it ('if error message is sent when receiving invalid email address', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(null)
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'fake@fake.be',
          password: 'fakefake'
        })
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.be.deep.equal({
        message: 'Invalid email or password'
      })
    })

    it ('if error message is sent when receiving an invalid password(less than 6 characters) ', async () => {
      sinon.stub(UsersModel, 'findOne').resolves(null)
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'mockmail@mockmail.com',
          password: 'fake'
        })
      expect(httpResponse.status).to.be.equal(401)
      expect(httpResponse.body).to.be.deep.equal({
        message: 'Invalid email or password'
      })
    })
  
  });