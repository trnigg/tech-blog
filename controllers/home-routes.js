const router = require('express').Router();
const fetchUser = require('../utils/fetchUser'); // check route for utils/fetchUser.js - serve out of public folder??
const userAuth = require('../utils/auth'); // see comments above

const { User, Post, Comment } = require('../models');

// Routes to handle navigation/rendering of pages

//_____________________________________GET ROUTES_____________________________________

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/log-in', async (req, res) => {
  try {
    res.render('log-in', { logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err); // Log  err
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sign-up', async (req, res) => {
  try {
    res.render('sign-up', { logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err); // Log  err
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET simple /log-out route to handle log-out confirmation

// GET a single Post by Post ID - currently fetchUser not being used, but may implement feature requiring it later
router.get('/post/:id', async (req, res) => {
  try {
    // Need to include the user model inside the comment model
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }
    const post = postData.get({ plain: true }); // Need to map?
    res.render('post', {
      post,
      logged_in: req.session.logged_in,
      // Pass the logged in user data to the front end using the fetchUser util
      current_user: req.user, //req.user returns the user data from the fetchUser util
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// fetchUser is used to match the logged in user to the user model and subsequently the user_name
router.get('/dashboard', fetchUser, userAuth, async (req, res) => {
  try {
    // Fetch all posts by the logged in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard page with the posts
    res.render('dashboard', { posts, logged_in: true, current_user: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/log-out', async (req, res) => {
  try {
    res.render('log-out', { logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err); // Log  err
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
