const router = require('express').Router();
const { Comment } = require('../../models'); // Confirm the models I need
const userAuth = require('../../utils/auth'); // see comments above

// _____________________________________POST ROUTES_____________________________________

// POST a new Comment
router.post('/', userAuth, async (req, res) => {
  console.log(req.body);
  try {
    const { text, post_id } = req.body;
    // Get user id from request object
    const userId = req.session.user_id;
    const commentData = await Comment.create({
      text,
      post_id: post_id,
      user_id: userId,
    });

    res.status(201).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*
// _____________________________________PUT ROUTES_____________________________________
// NOT CURRENTLY IMPLEMENTED
// PUT (update) a Comment (by ID)

router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// _____________________________________DELETE ROUTES_____________________________________
// NOT CURRENTLY IMPLEMENTED
//DELETE a Comment (by ID)
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

*/
module.exports = router;
