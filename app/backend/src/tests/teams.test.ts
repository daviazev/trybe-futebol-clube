import * as sinon from 'sinon';
import * as chai from 'chai';
import validateIfTeamsExists from '../database/middlewares/teams.middleware';
import TeamsRouter from '../database/routes/teams.routes'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import Teams from '../database/models/Teams'

import { allTeams } from './mocks/teams.mock'

describe('Testes para a rota /teams', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore())

  it('Deve retornar o status 200', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams as Teams[])
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200)
  })

  it('Deve retornar o status 200 - buscando um time pelo seu id', async () => {
    sinon.stub(Teams, 'findByPk').resolves(allTeams[0] as Teams)
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200)
  })

  it('Teste teste', async () => {
    sinon.stub(Teams, 'findByPk').resolves()

    chaiHttpResponse = await chai.request(app).get('/teams/9999')

    expect(chaiHttpResponse.status).to.be.equal(404);
  })
})
