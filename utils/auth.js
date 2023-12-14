// modified to handle other types of requests, complicated by the redirect not changing the request method
const userAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    // https://expressjs.com/en/api.html#req.method
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      // Send a 401 and handle redirect on client side in with alert as to why
      res.status(401).json({ message: 'Not logged in' });
      // If get request, redirect to log-in page
    } else {
      res.redirect('/log-in');
    }
  } else {
    next();
  }
};

module.exports = userAuth;
