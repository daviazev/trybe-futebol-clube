import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

import Teams from '../database/models/Teams'

import { allTeams } from './mocks/teams.mock'

describe('Testes para a rota /teams', () => {
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
})