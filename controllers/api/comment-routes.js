const router = require('express').Router();
const { User, Post, Comment } = require('../../models'); // Confirm the models I need

// _____________________________________GET ROUTES_____________________________________

// GET all Comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Comments by User ID
router.get('user/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [{ model: User }, { model: Post }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Comments by Post ID
router.get('post/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [{ model: User }, { model: Post }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// _____________________________________POST ROUTES_____________________________________

// POST a new Comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(201).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// _____________________________________PUT ROUTES_____________________________________

// PUT (update) a Comment (by ID)
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// _____________________________________DELETE ROUTES_____________________________________

//DELETE a Comment (by ID)
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
