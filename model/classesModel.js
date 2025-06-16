const pool = require('../config/dbmysql');

exports.getTodayPeriodsForTeacher = async (teacherId) => {
    console.log("your teacher id is...", teacherId);
    const [rows] = await pool.query(
      `SELECT 
          c.class_name,
          t.section,
           t.class_id,
          sub.subject_name,
          t.period_number,
          t.start_time,
          t.end_time,
          t.todayAttendenceStatus,
          sub.subject_id
       FROM timetable t
       JOIN classes c ON t.class_id = c.class_id
       JOIN subjects sub ON t.subject_id = sub.subject_id
       WHERE t.user_id = ? 
       ORDER BY t.period_number`,
      [teacherId]
    );
    return rows;
  };
  

exports.create = async ({ class_name }) => {
  const [result] = await pool.query(
    'INSERT INTO classes (class_name) VALUES (?)',
    [class_name]
  );
  return result.insertId;
};
