const router = require("express").Router();
const { Session, User } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");
const {v4: uuidv4} = require('uuid')

// path = /api/rooms

 // res.redirect(`/${uuidv4()}`)

 //:room = uuid
router.get("/", (req, res, next) => {
    const roomId = uuidv4()
    // console.log(roomId)
    res.send({roomId: roomId})
    // res.render('index', {roomId: req.params.room})
})
