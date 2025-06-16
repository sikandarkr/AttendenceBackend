const pool = require('../config/dbmysql');

exports.getByClassAndSection = async (classId, section) => {
    const [rows] = await pool.query(
      `SELECT student_id, name, roll_number, profile_pic_url, admission_number
       FROM students
       WHERE class_id = ? AND section = ?
       ORDER BY roll_number ASC`,
      [classId, section]
    );
    return rows;
  };
  

exports.create = async ({ name, roll_number, class_id, section, admission_number }) => {
  const [result] = await pool.query(
    `INSERT INTO students (name, roll_number, class_id, section, admission_number)
     VALUES (?, ?, ?, ?, ?)`,
    [name, roll_number, class_id, section, admission_number]
  );
  return result.insertId;
};
