const {expect} = require('chai')
const db = require('../../index')
const Session = require('../session')

describe('session model', () => {
    let session
    before(() => db.sync({ force: true }));
    beforeEach(() => {
        session = {
            status: 'closed',
            category: 'poem',
            blurb: 'I want to write a sonnet',
            summary: 'We wrote a beautiful sonnet'
        }
    })
    afterEach(() => db.sync({ force: true }));
    it("has a status, category, blurb, and summary fields", async () => {
        session.notARealAttribute = 'does not compute';
        const savedSession = await Session.create(session)
        expect(savedSession.status).to.equal('closed')
        expect(savedSession.category).to.equal('poem')
        expect(savedSession.blurb).to.equal('I want to write a sonnet')
        expect(savedSession.summary).to.equal('We wrote a beautiful sonnet')
        expect(savedSession.notARealAttribute).to.equal(undefined)
    })
    it('Catergory cannot be null', async () => {
        const blankSession = Session.build();
        try {
          await blankSession.validate();
          throw Error('validation should have failed without Category');
        } catch (err) {
          expect(err.message).to.contain('category cannot be null');
        }
    });
    xit('Catergory cannot be empty', async () => {
        const emptyTitleSession = Session.build({ category: '' });
        try {
          await emptyTitleSession.validate();
          throw Error('validation should have failed with empty Category');
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on category failed');
        }
      });
    xit('Blurb cannot be null', async () => {
        const blankSession = Session.build();
        try {
          await blankSession.validate();
          throw Error('validation should have failed without Blurb');
        } catch (err) {
          expect(err.message).to.contain('blurb cannot be null');
        }
    });
    xit('Blurb cannot be empty', async () => {
        const emptyTitleSession = Session.build({ category: '' });
        try {
          await emptyTitleSession.validate();
          throw Error('validation should have failed with empty Blurb');
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on blurb failed');
        }
      });
    it("Blurb can only be 100 characters", async () => {
      session.blurb= 'mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in'
      try {
        const badSession = await Session.create(session);
        if (badSession) {
          throw Error('Validation should have failed with invalid blurb');
        }
      }catch(error){
        expect(error.message).to.not.have.string('Validation should have failed');
      }
    })
    it("status can only be unmatched, matched or closed", async () => {
      session.status = 'open';
      try {
        const badSession = await Session.create(session);
        if (badSession) {
          throw Error('Validation should have failed with invalid Status');
        }
      }catch(error){
        expect(error.message).to.not.have.string('Validation should have failed');
      }
    })
    it("RoomId must be a UUID", async () => {
      session.roomId = '5a'
      try {
        const badSession = await Session.create(session);
        if (badSession) {
          throw Error('Validation should have failed with invalid rooomId');
        }
      }catch(error){
        expect(error.message).to.not.have.string('Validation should have failed');
      }
    })
    it("Summary can only be 100 characters", async () => {
      session.summary= 'mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi'
      try {
        const badSession = await Session.create(session);
        if (badSession) {
          throw Error('Validation should have failed with invalid summary');
        }
      }catch(error){
        expect(error.message).to.not.have.string('Validation should have summary');
      }
    })
})