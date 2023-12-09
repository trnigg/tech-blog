const { User } = require('../models');

// Util to fetch and pass details of current user (user making requests) to the front end
async function fetchUser(req, res, next) {
  if (req.session.user_id) {
    const userData = await User.findByPk(req.session.user_id);
    if (userData) {
      req.user = userData.get({ plain: true });
    }
  }
  next();
}

module.exports = fetchUser;
