import * as chai from 'chai'
import {expect} from 'chai'
import * as sinon from 'sinon'
// @ts-ignore
import chaiHttp = require('chai-http');
import {App, app} from '../app'

chai.use(chaiHttp)

const PORT = 5555

describe('tests the App if', () => {
  let server: App
  server = new App()

  it('calls the listen method with the correct', (done) => {
    const appSpy = sinon.spy(server, 'start')
    server.start(PORT)
    expect(appSpy.calledWith(PORT)).to.equal(true)
    done()
  })

  it('the home route works correctly "/"', async () => {
    const httpResponse = await chai
      .request(app)
      .get('/')
    expect(httpResponse.status).to.be.equal(200)
  })
})

// These tests were based on Ivan Rafael's mentoring class