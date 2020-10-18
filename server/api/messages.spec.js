
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const {Session, User, Message} = require('../db/models')



describe('messages routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/messages', () => {
let testSessions;   
    let testUser;
    beforeEach(async()=> {
        testUser = await User.create({
            username: "doyouevenliftbro",
            city: "Brooklyn",
            state: "NY",
            bio: "you could say I have a trust fund",
            medium: "graphic design",
            email: "chad@gmail.com",
            password: "12345"
        })
        testSessions = await Session.create({
            status: 'unmatched',
            category: 'dance',
            blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
        })
        return Message.create({
            content: 'hello',
            userId: testUser.id,
            sessionId: testSessions.id
        })
    })

    it('GET /api/messages all messages', async () => {
        const res = await request(app)
          .get('/api/messages')
          .expect(200)
  
        expect(res.body).to.be.an('array')
        expect(res.body[0].content).to.be.equal('hello')
    })



    it('POST /api/messages a new messages', async () => {
        const res = await request(app)
        .post('/api/messages')
        .send({
            content: 'bye',
            user: testUser,
            username: 'doyouevenliftbro'
        }).expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.content).to.be.equal('bye')
    })
//there was something wrong with the route when I wrote this test
    it('PUT /api/messages/:messageId updates my messages', async () => {
        const res = await request(app)
        .put('/api/messages/1')
        .send({
            content: 'bye'
        }).expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.content).to.be.equal('bye')
    })

    it('DELETE /api/messages/:messageId deletes a message', async () => {
        await request(app)
        .delete('/api/messages/1')
        .expect(204)
    })
  })
})