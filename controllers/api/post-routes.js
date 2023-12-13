const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); // Confirm the models I need

// _____________________________________GET ROUTES_____________________________________

// GET all Posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a Post by Post ID
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });
    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all Posts by User ID
router.get('/user/:id', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// _____________________________________POST ROUTES_____________________________________

// POST a new Post
router.post('/', async (req, res) => {
  try {
    const userID = req.session.user_id;
    // Spread the req.body - should return 'title' and 'content' properties as per /add-post.js fetch
    // Attach User ID using model key 'user_id'
    const postData = await Post.create({ ...req.body, user_id: userID });
    res.status(201).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// _____________________________________PUT ROUTES_____________________________________

// PUT (update) a Post (by ID)
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// _____________________________________DELETE ROUTES_____________________________________

//DELETE a Post (by ID)
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
