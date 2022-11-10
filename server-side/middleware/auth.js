const passport = require("passport");

const auth = async (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      next();
    })(req, res, next);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = auth;
