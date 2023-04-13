import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import mockTeams from './mocks/mockTeams';

const { expect } = chai;


describe('test the GET /teams route', () => {
    afterEach(sinon.restore)
      it ('if all teams are successfully requested', async () => {

        const chaihttpResponse = await chai
          .request(app)
          .get('/teams')

        expect(chaihttpResponse.status).to.be.equal(200)
        expect(chaihttpResponse.body).to.be.deep.equal(mockTeams)

      })
    })
      it ('if FC São Paulo is successfully requested ', async () => {

        const chaihttpResponse = await chai
          .request(app)
          .get('/teams/16')

        expect(chaihttpResponse.status).to.be.equal(200)
        expect(chaihttpResponse.body).to.be.deep.equal(mockTeams[15])

      })
