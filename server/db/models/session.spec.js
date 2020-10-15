const {expect} = require('chai')
const Session = require('express-session/session/session')
const db = require('../index')

describe('session model', () => {
    let session = {
        status: 'closed',
        category: 'poem',
        blurb: 'I want to write a sonnet',
        summary: 'We wrote a beautiful sonnet'
    }
    beforeEach(() => {
        db.sync({force: true})
    })
    it("has a status, category, blurb, and summary fields" => {
        session.notARealAttribute = 'does not compute';
        const savedSession = await Session.create(project)
    })
})