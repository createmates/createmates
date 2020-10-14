const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = require('../db/models/user')



describe('Login/SignUp routes', () => {
    beforeEach(() => {
      return db.sync({force: true})
    })
    describe('/auth routes', () => {
        beforeEach(()=> {
            return User.create({
                username: "doyouevenliftbro",
                city: "Brooklyn",
                state: "NY",
                bio: "you could say I have a trust fund",
                medium: "graphic design",
                email: "chad@gmail.com",
                password: "12345"
            })
        })

        it('POST auth/login valid user and password', async () => {
            const res = await request(app)
            .post('/auth/login')
            .send({email: 'chad@gmail.com', password: '12345'})
            .expect(200)

            expect(res.body).to.be.an('object')
            expect(res.body.username).to.be.equal('doyouevenliftbro')    
        })

        it('POST /auth/login valid email but password doesnt match', async () => {
            const res = await request(app)
            .post('/auth/login')
            .send({email: 'chad@gmail.com', password: '123'})
            .expect(401)

            expect(res.error.text).to.be.equal("Wrong username and/or password")
        })

        it('POST /auth/login not valid email or password', async () => {
            const res = await request(app)
            .post('/auth/login')
            .send({email: 'cd@gmail.com', password: '123'})
            .expect(401)

            expect(res.error.text).to.be.equal("Wrong username and/or password")
        })

        it("POST /auth/signup creates a new user", async () => {
            const res = await request(app)
            .post('/auth/signup')
            .send({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'doe@email.com',
                password: 'doe',
            })
            .expect(200)

            expect(res.body).to.be.an('object')
            expect(res.body.firstName).to.be.equal('Jane')    
        })
        it("POST /auth/signup cant make an account with a current users email address", async () => {
            const res = await request(app)
            .post('/auth/signup')
            .send({
                firstName: 'Chad',
                lastName: 'Doe',
                email: 'chad@gmail.com',
                password: 'doe',
            })
            .expect(401)
            expect(res.error.text).to.be.equal("User already exists")
        })
    })
})
