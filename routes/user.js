const express = require("express");
const router = express.Router();
const { handleCreateUserSignUp,handleUserLogin } = require('../controllers/user');

router.post('/', handleCreateUserSignUp);
router.post('/login', handleUserLogin);

module.exports = router;
