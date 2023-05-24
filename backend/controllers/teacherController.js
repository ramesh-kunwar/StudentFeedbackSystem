const asyncHandler = require('express-async-handler')

const Teacher = require('../models/teacher')

/**********************************
 *      @desc Get all teachers
 *      @route GET /api/v1/teachers
 *      @access Public
/**********************************/

exports.getTeachers = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        msg: "All teachers"
    })

})





/**********************************
 *      @desc Get single teacher
 *      @route GET /api/v1/teachers/:id
 *      @access Public
/**********************************/

exports.getTeacher = (req, res) => {

    res.status(200).json({
        success: true,
        msg: "Single teacher"
    })

}



/**********************************
 *      @desc Create Teacher
 *      @route POST /api/v1/teachers
 *      @access PRIVATE
/**********************************/

exports.createTeachers = asyncHandler(async(req, res) => {

    const teacher = await Teacher.create(req.body);

    res.status(200).json({
        success: true,
        data: teacher
    })

})


/**********************************
 *      @desc Update Teacher
 *      @route PUT /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.updateTeachers = (req, res) => {

    res.status(200).json({
        success: true,
        id: req.params.id,
        msg: "Update Teacher"
    })

}

/**********************************
 *      @desc Delete Teacher
 *      @route DELETE /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.deleteTeachers = (req, res) => {

    res.status(200).json({
        success: true,
        id: req.params.id,
        msg: "Delete Teacher"
    })

}
