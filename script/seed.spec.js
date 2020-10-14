'use strict'
const { Session, User } = require('../server/db/models')
const {expect} = require('chai')
/* global describe it */

const seed = require('./seed')

describe('seed script', () => {
  it('completes successfully', seed)
  it('populates the database with at least four items', async () => {
    const seedSessions = await Session.findAll()
    expect(seedSessions).to.have.lengthOf.at.least(4)
  })
  it('populates the database with at least two users', async () => {
    const seedUsers = await User.findAll()
    expect(seedUsers).to.have.lengthOf.at.least(2)
  })
})
