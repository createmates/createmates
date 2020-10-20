const router = require("express").Router();
const { User, Session } = require("../db/models");
module.exports = router;
const { isAdminMiddleware } = require("../app/authentication-middleware");
//below is from boilermaker? commented out to deconflict with our model called Session, which is now required in line 2 above:
// const { Session } = require("express-session");

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
        "profilePhoto"
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
    const userRes = await User.findByPk(userId,
      {
        include: [Session]
        }
      );

    res.json(userRes);
  } catch (err) {
    next(err);
  }
});

router.put("/:userid", async (req, res, next) => {
try {
let profile = await User.findByPk(req.params.userid);
    profile.update({
      username: req.body.username,
      medium: req.body.medium,
      email: req.body.email,
      city: req.body.city,
      state: req.body.userState,
      bio: req.body.bio
    });
    res.json(profile);
  } catch (err) {
    next(err);
  }

});


