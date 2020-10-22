
const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const {Session, User} = require('../../db/models')



describe('closedSessions routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/closedSessions', () => {
    const testSessions = 'Would love some eyes on a new 30 second phrase I just came up with'
    let testUser;
    let testSession1
    beforeEach(async ()=> {
        testUser = await User.create({
            username: "doyouevenliftbro",
            city: "Brooklyn",
            state: "NY",
            bio: "you could say I have a trust fund",
            medium: "graphic design",
            email: "chad@gmail.com",
            password: "12345"
        })
        testSession1 =  await Session.create({
            status: 'closed',
            category: 'dance',
            blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
        })
        await testSession1.addUser(testUser.id)
    })

    it('GET /api/closedSessions all unmatched sessions', async () => {
        const res = await request(app)
          .get('/api/closedSessions')
          .expect(200)
  
        expect(res.body).to.be.an('array')
        expect(res.body[0].blurb).to.be.equal(testSessions)
        expect(res.body[0].status).to.be.equal('closed')
    })
})
})