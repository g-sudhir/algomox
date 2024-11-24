const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/profile', authenticate, userController.getUserProfileHandler);

module.exports = router;
