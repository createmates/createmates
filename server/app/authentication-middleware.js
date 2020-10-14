const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user;
  if (currentUser && currentUser.isAdmin) {
    next();
  } else {
    const err = new Error("User is not an admin!");
    err.status = 401
    next(err);
  }
};

module.exports = {
  isAdminMiddleware,
};
