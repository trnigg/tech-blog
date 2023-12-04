const router = require('express').Router();

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

// GET a single Post by Post ID
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
    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
