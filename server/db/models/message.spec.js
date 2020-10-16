const {expect} = require('chai')
const db = require('../index')
const Message = require('./message')
const User = require('./user')

describe('Message Model', () => {
    before(() => {
        return db.sync({force: true})
      })
    let cody

    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })

    })
    afterEach(() => db.sync({ force: true }));
    it('Content can not be null', async () => {
        const emptyMessage= Message.build();
        try {
          await emptyMessage.validate();
          throw Error('validation should have failed without an content');
        } catch (err) {
          expect(err.message).to.contain('content cannot be null');
        }
    })
})