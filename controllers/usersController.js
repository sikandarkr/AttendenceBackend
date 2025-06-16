const model = require('../model/usersModel');
const bcrypt = require('bcrypt');
const { success, error } = require('../utils/response');

exports.addUser = async (req, res) => {
  try {
    const { name, email, phone, password ,role} = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    const teacherId = await model.create({ name, email, phone, password_hash, role });
    success(res, 'User created successfully', { teacherId });
  } catch (err) {
    console.error(err);
    error(res, 500, 'Failed to create teacher');
  }
};
