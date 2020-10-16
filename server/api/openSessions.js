const router = require("express").Router();
const { Session, User, Tag } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");

router.get('/', async (req, res, next) => {
    try {
        const sessions = await Session.findAll({
          where: {status: 'unmatched'},
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
    console.log(userSession[0].sessions)
    const session = await Session.findOne({where: {id: userSession[0].sessions[0].id}, include: [User]})
    console.log(session)
    // const sessionArray = await Session.findAll({
    //   where: {status: 'matched'},
    //   include:[User]
    // })
    // console.log(sessionArray)
    // const session = sessionArray.filter(session => {
    //   console.log(session.users)
    //   if(session.users[0].id === req.params.userId){
    //     return true
    //   } else if(session.users[1].id === req.params.userId){
    //     return true
    //   }else{
    //     return false
    //   }
      
    // })
// console.log(session)
    res.json(session)
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

