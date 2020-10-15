const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./user");
const Session = require("./session");
const Tag = require("./tag")
const Message = require('./message');

User.belongsToMany(Session, {through: 'Mate_Table'});
Session.belongsToMany(User, {through: 'Mate_Table'});
Session.belongsToMany(Tag, {through: 'Session_Tag'});
Tag.belongsToMany(Session, {through: 'Session_Tag'});

Session.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
});

User.hasMany(Message);

Message.belongsTo(Session);
Message.belongsTo(User);

module.exports = {
  User,
  Session,
  Tag,
  Message
};
