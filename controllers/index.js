const router = require('express').Router();

const apiRoutes = require('./api');
const userRoutes = require('./user-routes');

router.use('/api', apiRoutes);
router.use('/user', userRoutes);

module.exports = router;
