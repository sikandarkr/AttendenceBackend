const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/dbmysql');
const { error, success } = require('../utils/response');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return error(res, 400, 'Email and password are required');
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return error(res, 401, 'Invalid email or password');
    }

    const teacher = rows[0];
    const passwordMatch = await bcrypt.compare(password, teacher.password_hash);

    if (!passwordMatch) {
      return error(res, 401, 'Invalid email or password');
    }

    const payload = {
      teacher_id: teacher.teacher_id,
      email: teacher.email,
      name: teacher.name,
      role:teacher.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return success(res, 'Login successful', {
      token,
      teacher: {
        teacher_id: teacher.teacher_id,
        name: teacher.name,
        email: teacher.email,
        role:teacher.role
      }
    });

  } catch (err) {
    console.error(err);
    return error(res, 500, 'Server error during login');
  }
};
