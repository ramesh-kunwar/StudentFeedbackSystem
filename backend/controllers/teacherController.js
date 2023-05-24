const asyncHandler = require('express-async-handler')

const Teacher = require('../models/teacher')


/**********************************
 *      @desc Get all teachers
 *      @route GET /api/v1/teachers
 *      @access Public
/**********************************/

exports.getTeachers = asyncHandler(async (req, res) => {
    const teacher = await Teacher.find()


    res.status(200).json({
        success: true,
        data: teacher
    })

})





/**********************************
 *      @desc Get single teacher
 *      @route GET /api/v1/teachers/:id
 *      @access Public
/**********************************/

exports.getTeacher = asyncHandler(async (req, res) => {

    const teacher = await Teacher.findById(req.params.id)

    if (!teacher) {
        res.status(404).json({
            success: false,
            msg: `No teacher found with id: ${req.params.id}`

        })
    }

    res.status(200).json({
        success: true,
        data: teacher

    })

})



/**********************************
 *      @desc Create Teacher
 *      @route POST /api/v1/teachers
 *      @access PRIVATE
/**********************************/

exports.createTeachers = asyncHandler(async (req, res) => {

    const teacher = await Teacher.create(req.body);

    res.status(201).json({
        success: true,
        data: teacher
    })

})


/**********************************
 *      @desc Update Teacher
 *      @route PUT /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.updateTeachers = asyncHandler(async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.status(404).json({
            success: false,
            msg: `No teacher found with id: ${req.params.id}`
        })
    }

    const teacher = await Teacher.findByIdAndUpdate(id, req.body)

    res.status(200).json({
        success: true,
        data: teacher,
    })

})

/**********************************
 *      @desc Delete Teacher
 *      @route DELETE /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.deleteTeachers = asyncHandler(async (req, res) => {

    const id = req.params.id
    if (!id) {
        res.status(404).json({
            success: false,
            msg: `No teacher found with id: ${req.params.id}`
        })
    }

    const teacher = await Teacher.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        data: teacher,
    })

})
