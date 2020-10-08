const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./user");
const Session = require("./session");
const Tag = require("./tag")

User.belongsToMany(Session, {through: 'Mate_Table'});
Session.belongsToMany(User, {through: 'Mate_Table'});
Session.belongsToMany(Tag, {through: 'Session_Tag'});
Tag.belongsToMany(Session, {through: 'Session_Tag'});

module.exports = {
  User,
  Session,
  Tag
};
