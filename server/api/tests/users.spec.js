/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')


describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)

      expect(res.error.text).to.be.equal('User is not an admin!')
    })
    it('GET /api/users/:userid', async () => {
      const res = await request(app)
      .get('/api/users/1')
      .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
    it('PUT /api/users/:userid', async () => {
      const res = await request(app)
      .put('/api/users/1')
      .send({
        username:'cody',
        medium: 'painting',
        email: codysEmail,
        city: 'ny',
        userState: 'ny',
        bio: 'why does this keep tabbing over'
      })
      .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
      expect(res.body.username).to.be.equal('cody')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
