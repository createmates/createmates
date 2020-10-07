const router = require("express").Router();
const { User } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");

router.get("/", isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "id",
        "username",
        "city",
        "state",
        "bio",
        "medium",
        "email",
        "isAdmin",
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userid", async (req, res, next) => {
  const userId = req.params.userid;
  try {
    const userRes = await User.findByPk(userId);
    res.json(userRes);
  } catch (err) {
    next(err);
  }
});

router.put("/:userid", async (req, res, next) => {
  let profile;
  try {
    profile = await User.findByPk(req.params.userid);
    profile.update(req.body);
  } catch (err) {
    next(err);
  }
  res.json(profile);
});
