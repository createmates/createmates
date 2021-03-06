const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/openSessions", require("./openSessions"))
router.use('/messages', require('./messages'));
router.use('/closedSessions', require('./closedSessions'))


router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
