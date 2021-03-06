const router = require("express").Router();
const { Session, User, Tag } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");
const {Op} = require("sequelize");

router.get('/', async (req, res, next) => {
    try {
        const sessions = await Session.findAll({
          where: {status: 'unmatched' },
          include: [User, Tag]
        });
        res.json(sessions)
    } catch(err) {
        next(err)
    }
})


router.post("/", async (req, res, next) => {
  try {
    const session = await Session.create(req.body);
    await session.addUser(req.body.user.id);
    if(req.body.tags){
      req.body.tags.forEach(async tag => {
        const [tagObj, wasCreated] = await Tag.findOrCreate({where: {name: tag}})
        await session.addTag(tagObj);
      })
    }
    res.json(session);
  } catch (err) {
    next(err);
  }
});


router.put("/:sessionId", async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId);
    const updatedSession = await session.update(req.body);
    if(req.body.user){
         await updatedSession.addUser(req.body.user.id);
    }
    if(req.body.tags){
      req.body.tags.forEach(async tag => {
        const [tagObj, wasCreated] = await Tag.findOrCreate({where: {name: tag}})
        await updatedSession.addTag(tagObj);
      })
    }

    res.json(updatedSession);
  } catch (err) {
    next(err);
  }
});


router.get("/:sessionId", async (req, res, next) => {
  try {
    const session = await Session.findOne({where: {id: req.params.sessionId}, include: [User]});
    res.json(session);
  } catch (err) {
    next(err);
  }
});

// GET /api/openSessions/:userId/matched
router.get('/:userId/matched', async (req, res, next) => {
  try {
    const userSession = await User.findAll({where: {id: req.params.userId}, include: {
      model: Session, where: {status: 'matched'}}})
      if(userSession.length) {
        const session = await Session.findOne({where: {id: userSession[0].sessions[0].id}, include: [User, Tag]})
    
        res.json(session)
      } else {
        res.sendStatus(204)
      }
  } catch (err){
    next(err)
  }
})

// GET /api/openSessions/:userId/open
router.get('/:userId/open', async (req, res, next) => {
  try {
    const userSession = await User.findAll({where: {id: req.params.userId}, include: {
      model: Session, where: {
        status: {
          [Op.ne] : 'closed'
        }
    }
  }
})

  if(userSession.length) {
    const session = await Session.findOne({where: {id: userSession[0].sessions[0].id}, include: [User, Tag]})

    res.json(session)
  } else {
    res.sendStatus(204)
  }
  } catch (err){
    next(err)
  }
})

// GET /api/openSessions/:sessionId/messages
router.get('/:sessionId/messages', async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const messages = await Message.findAll({ where: { sessionId } })
    res.json(messages);
  } catch (err) {
    next(err);
  }
});


router.delete("/:sessionId", async (req, res, next) => {

  try {
    const session = await Session.findByPk(req.params.sessionId);
    await session.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

