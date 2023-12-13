const userAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.logged_in) {
    res.redirect('/log-in'); // Confirm/change url for redirect
  } else {
    // If the user is logged in, execute the route function requested (i.e. 'next')
    next();
  }
};

module.exports = userAuth;
