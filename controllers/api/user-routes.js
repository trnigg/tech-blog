const router = require('express').Router();
const { User } = require('../../models'); // Confirm the models I need

// These are the routes to the user API for log-in/registration purposes.
// They do not handle any navigation.

// _____________________________________POST ROUTES_____________________________________

// POST a new User (Sign Up)
// Consider also validation error handling at 400
router.post('/sign-up', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(201).json(userData);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST an existing User (Log In)
router.post('/log-in', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ error: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ error: 'Incorrect email or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // Add a redirect to the dashboard/home page after successful log-in
});

// POST a User (Log Out) - re-routing is handled by script in public/js/log-out.js
router.post('/log-out', async (req, res) => {
  try {
    // IF logged_in is true, destroy the session
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
