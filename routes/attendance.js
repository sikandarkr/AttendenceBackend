const express = require('express');
const router = express.Router();
const controllers = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

// const validate = require('../middlewares/validateAttendance');

router.post('/mark_attendence', authMiddleware, controllers.markAttendance);
router.get('/:date', controllers.getAttendanceByDate);

module.exports = router;
