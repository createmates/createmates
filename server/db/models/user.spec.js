/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    })
  })
    describe('user email', () => {
      beforeEach(async () => {
        return await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
       })
      xit('email cannot be empty', async () => {
        const emptyEmailUser= User.build({ email: '', password: '12345'});
        try {
          await emptyEmailUser.validate();
          throw Error('validation should have failed with empty email');
        } catch (err) {
          expect(err.message).to.contain('Validation notEmpty on email failed');
        }
      })
      it('email cannot be null', async () => {
        const emptyEmailUser= User.build({ firstName: 'mary', password: '12345'});
        try {
          await emptyEmailUser.validate();
          throw Error('validation should have failed without an email');
        } catch (err) {
          expect(err.message).to.contain('email cannot be null');
        }
      })
      it('email must be unique', async () => {
        try {
          await User.create({ email: 'cody@puppybook.com', password: '12345'});
          throw Error('validation should have failed without an unique email');
        } catch (err) {
          expect(err.message).to.contain('Validation error');
        }
      })
    })
    describe('Username', () => {
      beforeEach(async () => {
        return await User.create({
          email: 'cody@puppybook.com',
          username: 'cody12345',
          password: 'bones'
        })
       })
      it('Username must be unique', async () => {
        try {
          await User.create({ email: 'cdy@puppybook.com',username: 'cody12345', password: '12345'});
          throw Error('validation should have failed without an unique username');
        } catch (err) {
          expect(err.message).to.contain('Validation error');
        }
      })

  }) // end describe('instanceMethods')
}) // end describe('User model')
