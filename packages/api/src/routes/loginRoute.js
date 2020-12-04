const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.authenticateUser());
router.get('/user/:email', loginController.getUserNameByUserEmail());

module.exports = router;
