const {expect} = require('chai')
const db = require('../../index')
const {User, Tag, Session, Message} = require('..')

describe('Model Association', () => {
    before(() => db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    it('a session can have many users', async () => {
        const user1 = await User.create({
            username: "doyouevenliftbro",
            city: "Brooklyn",
            state: "NY",
            bio: "you could say I have a trust fund",
            medium: "graphic design",
            email: "chad@gmail.com",
            password: "12345"
        })
        const user2 = await User.create({
            username: "hecklersbeware",
            city: "Brooklyn",
            state: "NY",
            bio: "looking for a laugh",
            medium: "comedy",
            email: "lolololol@gmail.com",
            password: "12345",
        })
        const testsession = await Session.create({
            status: 'unmatched',
            category: 'dance',
            blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
        })
        await testsession.addUsers([user1.id, user2.id])
        const sessionUsers = await testsession.countUsers()
        expect(sessionUsers).to.equal(2)
    })
    it('a session can have many tags', async () => {
        const tag1 = await Tag.create( {name: 'feedback'})
        const tag2 = await Tag.create( {name: 'painting'})
        const testsession = await Session.create({
            status: 'unmatched',
            category: 'dance',
            blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
        })
        await testsession.addTags([tag1, tag2])
        const sessionTags = await testsession.countTags()
        expect(sessionTags).to.equal(2)
    })
})