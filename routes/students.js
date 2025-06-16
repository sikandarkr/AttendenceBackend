const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');
const validate = require('../middlewares/validateStudent');

router.get('/get-student-by-class', controller.getStudentsByClassAndSection);
router.post('/add_student', validate, controller.addStudent);

module.exports = router;
