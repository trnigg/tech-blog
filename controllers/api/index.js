const router = require('express').Router();

const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
