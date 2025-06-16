// const model = require('../models/classesModel');
// const { success, error } = require('../utils/response');

const model = require('../model/classesModel');
const { success, error } = require('../utils/response');

exports.getTodayPeriodsForTeacher = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return error(res, 400, 'Missing user_id  in query');
        }

        const data = await model.getTodayPeriodsForTeacher(user_id);
        success(res, "Fetched today's periods", data);
    } catch (err) {
        console.error(err);
        error(res, 500, 'Server error');
    }
};

exports.addClass = async (req, res) => {
    try {
        const id = await model.create(req.body);
        success(res, 'Class added', { classId: id });
    } catch (err) {
        error(res, 500, 'Could not add class');
    }
};
