
const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const {Session, User} = require('../../db/models')
const {v4: uuidv4} = require('uuid')


describe('OpenSessions routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/openSessions', () => {
    const testSessions = 'Would love some eyes on a new 30 second phrase I just came up with'
    let testUser;
    let testSession1
    const testRoomId = uuidv4()
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
            status: 'unmatched',
            category: 'dance',
            blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
        })
        await testSession1.addUser(testUser.id)
    })

    it('GET /api/openSessions all unmatched sessions', async () => {
        const res = await request(app)
          .get('/api/openSessions')
          .expect(200)
  
        expect(res.body).to.be.an('array')
        expect(res.body[0].blurb).to.be.equal(testSessions)
        expect(res.body[0].status).to.be.equal('unmatched')
    })



    it('POST /api/openSessions a new Session', async () => {
        const res = await request(app)
        .post('/api/openSessions')
        .send({
            category: 'joke',
            status: 'unmatched',
            blurb: 'Need some help wording a joke',
            user: {
                id: 1
            },
        }).expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.blurb).to.be.equal('Need some help wording a joke')
        expect(res.body.status).to.be.equal('unmatched')
    })

    it('PUT /api/openSessions/:sessionId updates my session', async () => {
        const res = await request(app)
        .put('/api/openSessions/1')
        .send({
            category: 'joke',
            status: 'unmatched',
            blurb: 'Need some help wording a joke'
        }).expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.blurb).to.be.equal('Need some help wording a joke')
        expect(res.body.status).to.be.equal('unmatched')
    })

    it('PUT /api/openSessions/:sessionId updates my session', async () => {
        const res = await request(app)
        .put('/api/openSessions/1')
        .send({
            roomId: testRoomId,
            status: 'matched',
            user: testUser
        }).expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.roomId).to.be.equal(testRoomId)
        expect(res.body.status).to.be.equal('matched')
    })
    it('GET /api/openSessions/:userId/open can return only one unmatched session', async () =>{
        const res = await request(app)
        .get('/api/openSessions/1/open')
        .expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.status).to.be.equal('unmatched')
        expect(res.body.blurb).to.be.equal(testSessions)
    })
    it('GET /api/openSessions/:userId/open can return only one unmatched session', async () =>{
         await request(app)
        .put('/api/openSessions/1')
        .send({
            roomId: testRoomId,
            status: 'matched',
            user: testUser
        }).expect(200)
        const res = await request(app)
        .get('/api/openSessions/1/open')
        .expect(200)

        expect(res.body).to.be.an('object')
        expect(res.body.status).to.be.equal('matched')
        expect(res.body.blurb).to.be.equal(testSessions)
    })
    it('GET /api/openSessions/:userId/open cannot return a closed session', async () =>{
        await testSession1.update({status: 'closed'})
        const res = await request(app)
        .get('/api/openSessions/1/open')
        .expect(204)
    })
    it('GET /api/openSessions/:userId/open can return only one matched session', async () =>{
        await request(app)
       .put('/api/openSessions/1')
       .send({
           roomId: testRoomId,
           status: 'matched',
           user: testUser
       }).expect(200)
       const res = await request(app)
       .get('/api/openSessions/1/matched')
       .expect(200)

       expect(res.body).to.be.an('object')
       expect(res.body.status).to.be.equal('matched')
       expect(res.body.blurb).to.be.equal(testSessions)
   })
   it('GET /api/openSessions/:userId/matched cannot return an unmatched session', async () =>{
        const res = await request(app)
        .get('/api/openSessions/1/matched')
        .expect(204)
    })
   it('GET /api/openSessions/:userId/matched cannot return a closed session', async () =>{
       await testSession1.update({status: 'closed'})
       const res = await request(app)
       .get('/api/openSessions/1/matched')
       .expect(204)
   })
    


    it('GET /api/openSessions/:sessionId one sessions', async () => {
        const res = await request(app)
          .get('/api/openSessions/1')
          .expect(200)
  
        expect(res.body).to.be.an('object')
        expect(res.body.blurb).to.be.equal(testSessions)
    })
    it('DELETE /api/openSessions/:sessionId deletes a session', async () => {
        await request(app)
        .delete('/api/openSessions/1')
        .expect(204)
    })
  })
})