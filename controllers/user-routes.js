const router = require('express').Router();
const { User } = require('../models'); // Confirm the models I need

// _____________________________________POST ROUTES_____________________________________

// POST a new User (Sign Up)
// Consider also validation error handling at 400
router.post('/sign-up', async (req, res) => {
  try {
    await User.create(req.body);
    // res.status(201).json(userData); Can't send json and redirect in same request
    res.redirect('/log-in'); // redirect to log-in page - session will be saved once logged-in
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
      // res.status(200).json({ user: userData, message: 'You are now logged in!' }); Can't send json and redirect in same request
      res.redirect('/dashboard'); // Redirect to dashboard page after log-in
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
  // Add a redirect to the dashboard/home page after successful log-in
});

// TODO: POST a User (Log Out)

// MAYBE TODO: PUT a User (Update User Info)
// MAYBE TODO: DELETE a User (Delete User Account)

module.exports = router;
