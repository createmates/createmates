const router = require("express").Router();
const { Session, User } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");
const {v4: uuidv4} = require('uuid')

// path = /api/rooms

 // res.redirect(`/${uuidv4()}`)

 //:room = uuid
router.get("/:room", (req, res, next) => {
    res.send({roomId: req.params.room})
    // res.render('index', {roomId: req.params.room})
})
