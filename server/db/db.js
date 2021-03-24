const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '_test' : '')
let db
if (process.env.DATABASE_URL) {
  // heroku configuration
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false
    }
  })
} else {
  // local configuration
  db = new Sequelize(`postgres://localhost:5432/${databaseName}`, {
    logging: false
  })
}
module.exports = db
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
