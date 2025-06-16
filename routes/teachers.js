const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const validate = require('../middlewares/validateTeacher');

router.post('/add_teacher', validate, controller.addUser);

module.exports = router;
