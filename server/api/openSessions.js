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
    res.json(session);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const updatedSession = await Session.update(req.body);
    res.json(updatedSession);
  } catch (err) {
    next(err);
  }
});

router.get("/:sessionId", async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.sessionId);
    res.json(session);
  } catch (err) {
    next(err);
  }
});

router.delete("/:sessionId", async (req, res, next) => {

  try {
    const session = await Session.findByPk(req.params.sessionId);
    await Session.destroy(session);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

