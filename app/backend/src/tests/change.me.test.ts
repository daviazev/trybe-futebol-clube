import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');


import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import User from '../database/models/Users';

import UserController from '../database/controller/user.controller';

import { Response } from 'superagent';

import { loginMock, sucessUser, token } from './mocks/user.mocks'

chai.use(chaiHttp);

const { expect } = chai;


describe('Seu teste', () => {
  // let chaiHttpResponse: Response;

  before(async () => {
    sinon
     .stub(User, "findOne")
     .resolves(sucessUser as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })


  it('Requisição retorna status 200', async () => {
    const response = await chai.request(app).post('/login').send(loginMock)

    expect(response.status).to.be.equal(200)
  })
});
