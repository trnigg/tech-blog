const router = require('express').Router();
// const { User, Post, Comment } = require('../models'); // Confirm the models I need here later

// Routes to handle navigation/rendering of pages

//_____________________________________GET ROUTES_____________________________________

router.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;