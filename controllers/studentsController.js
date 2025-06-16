const model = require('../model/studentsModel');
const { success, error } = require('../utils/response');

exports.getStudentsByClassAndSection = async (req, res) => {
    try {
      const { class_id, section } = req.query;
  
      if (!class_id || !section) {
        return error(res, 400, 'class_id and section are required');
      }
  
      const students = await model.getByClassAndSection(class_id, section);
  
      if (students.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No students found for the given class and section'
        });
      }
  
      success(res, 'Fetched students by class and section', students);
    } catch (err) {
      console.error(err);
      error(res, 500, 'Failed to fetch student list');
    }
  };
  
  


exports.addStudent = async (req, res) => {
    try {
        const id = await model.create(req.body);
        success(res, 'Student added', { studentId: id });
    } catch (err) {
        error(res, 500, 'Could not add student');
    }
};
