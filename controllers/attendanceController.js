const model = require('../model/attendanceModel');
const { success, error } = require('../utils/response');

exports.markAttendance = async (req, res) => {
  try {
    const { session, records } = req.body;
   
    const sessionId = await model.createSession(session);
    await model.createRecords(sessionId, records);
    success(res, 'Attendance recorded', { sessionId });
  } catch (err) {
    error(res, 500, 'Failed to record attendance');
  }
};

exports.getAttendanceByDate = async (req, res) => {
//   try {
//     const data = await model.getByDate(req.params.date);
//     success(res, 'Attendance records', data);
//   } catch (err) {
//     error(res, 500, 'Error fetching attendance');
//   }
};
