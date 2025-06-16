const pool = require('../config/dbmysql');

exports.createSession = async ({ user_id, class_id, subject_id, period_number, latitude, longitude, classroom_photo_url }) => {
  const [result] = await pool.query(
    `INSERT INTO attendance_sessions 
    (user_id, class_id, subject_id, period_number, latitude, longitude, classroom_photo_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, class_id, subject_id, period_number, latitude, longitude, classroom_photo_url]
  );
  return result.insertId;
};

exports.createRecords = async (sessionId, records) => {
  const values = records.map(({ student_id, status, reason }) => [sessionId, student_id, status, reason]);
  await pool.query(
    'INSERT INTO attendance_records (session_id, student_id, status, reason) VALUES ?',
    [values]
  );
};

exports.getByDate = async (date) => {
  const [rows] = await pool.query(
    `SELECT s.session_id, s.attendance_date, s.class_id, r.student_id, r.status 
     FROM attendance_sessions s 
     JOIN attendance_records r ON s.session_id = r.session_id 
     WHERE DATE(s.attendance_date) = ?`,
    [date]
  );
  return rows;
};
