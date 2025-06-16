const pool = require('../config/dbmysql');

exports.create = async ({ name, email, phone, password_hash, role }) => {
  const [result] = await pool.query(
    `INSERT INTO users (name, email, phone, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, phone, password_hash, role]
  );
  return result.insertId;
};
