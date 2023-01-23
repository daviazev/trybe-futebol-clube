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

import { 
  loginMock,
  sucessUser,
  noEmailLoginMock, 
  noPasswordLoginMock,
  invalidEmail,
  invalidPassword
 } from './mocks/user.mocks'

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes para a rota /login', () => {
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

  it('Requisição retorna status 400 - sem email', async () => {
    const response = await chai.request(app).post('/login').send(noEmailLoginMock)

    expect(response.status).to.be.equal(400)
  })

  it('Requisição retorna status 400 - sem password', async () => {
    const response = await chai.request(app).post('/login').send(noPasswordLoginMock)

    expect(response.status).to.be.equal(400)
  })

  it('Requisição deve retornar status 401 - email inválido', async () => {
    const response = await chai.request(app).post('/login').send(invalidEmail)

    expect(response.status).to.be.equal(401);
  })

  it('Requisição deve retornar status 401 - senha inválida', async () => {
    const response = await chai.request(app).post('/login').send(invalidPassword)

    expect(response.status).to.be.equal(401);
  })
});
