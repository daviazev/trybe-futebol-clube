import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as bcryptjs from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { allMatches } from './mocks/matches.mock'

chai.use(chaiHttp)

const { expect } = chai;

import Matches from '../database/models/Matches';
import MatchesService from '../database/service/matches.service';

const matchesService = new MatchesService()

import { Response } from 'superagent';

describe('Testes para a rota /matches', () => {
  let chaiHttpResponse: Response

  afterEach(() => {
    sinon.restore()
  })

  it('Deve retornar status 200', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches as unknown as Matches[])

    chaiHttpResponse = await chai.request(app).get('/matches')

    expect(chaiHttpResponse.status).to.be.equal(200)
  })

  it('Deve retornar status 200 - partidas com inProgress false', async () => {
    const filter = allMatches.filter((e) => !e.inProgress)
    sinon.stub(Matches, 'findAll').resolves(filter as unknown as Matches[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('Deve retornar status 200 - partidas com inProgress true', async () => {
    const filter = allMatches.filter((e) => e.inProgress)
    sinon.stub(Matches, 'findAll').resolves(filter as unknown as Matches[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  it('update match', async () => {
    sinon.stub(Matches, 'update').resolves()

    const response = await chai.request(app).patch('/matches/1')

    expect(response.status).to.be.equal(200)
  })

  it('finisg match', async () => {
    sinon.stub(Matches, 'update').resolves()

    const response = await chai.request(app).patch('/matches/1/finish')

    expect(response.status).to.be.equal(200)
  })

  it('create match', async () => {
    sinon.stub(Matches, 'create').resolves()

    const response = await chai.request(app).post('/matches')

    expect(response.status).to.be.equal(422)
  })

//   interface IUpdateMatch {
//     id?: number,
//     homeTeamId: number,
//     awayTeamId: number,
//     homeTeamGoals: number,
//     awayTeamGoals: number,
//     inProgress: boolean,
//   }

  it('create match - status 422', async () => {
    sinon.stub(Matches, 'create').resolves()

    const response = await chai.request(app).post('/matches')

    expect(response.status).to.be.equal(422)
  })

//   it('create match', async () => {
//     const match = {
//       id: 1,
//       homeTeamId: 1,
//       awayTeamId: 2,
//       homeTeamGoals: 1,
//       awayTeamGoals: 1,
//       inProgress: true
//     }

//     sinon.stub(Matches, 'create').resolves(match as Matches)

//     const response = await chai.request(app).post('/matches').send({ body: match })

//     console.log(response);

//     expect(response.status).to.be.equal(422)
//   })
})