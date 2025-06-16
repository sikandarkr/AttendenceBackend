const express = require('express');
const router = express.Router();
const controller = require('../controllers/classesController');
// const validate = require('../middlewares/validateClass');

router.get('/today-periods', controller.getTodayPeriodsForTeacher);
// router.post('/', validate, controller.addClass);

module.exports = router;
