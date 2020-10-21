const router = require("express").Router();
const { Session, User, Tag } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");
const {Op} = require("sequelize");

router.get('/', async (req, res, next) => {
    try {
        const sessions = await Session.findAll({
          where: {status: 'closed'},
          include: [User, Tag]
        });
        res.json(sessions)
    } catch(err) {
        next(err)
    }
})