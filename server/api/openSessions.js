const router = require("express").Router();
const { Session, User, Tag } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");
const { v4: uuidv4 } = require("uuid");


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
    // res.redirect(`/${uuidv4()}`)
})

//below is moved to /api/rooms.js
// //:room = uuid
// router.get("/:room", (req, res, next) => {
//     res.send({roomId: req.params.room})
//     // res.render('index', {roomId: req.params.room})
// })


router.post("/", async (req, res, next) => {
  try {
    const session = await Session.create(req.body);
    await session.addUser(req.body.user.id);
    req.body.tags.forEach(async tag => {
      const [tagObj, wasCreated] = await Tag.findOrCreate({where: {name: tag}})
      await session.addTag(tagObj);
    })
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

router.delete("/:sessionId", async (req, res, next) => {

  try {
    const session = await Session.findByPk(req.params.sessionId);
    await session.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

