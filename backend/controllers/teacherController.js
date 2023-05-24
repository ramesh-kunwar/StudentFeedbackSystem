

/**********************************
 *      @desc Get all teachers
 *      @route GET /api/v1/teachers
 *      @access Public
/**********************************/

exports.getTeachers = (req, res) => {
    res.status(200).json({
        success: true,
        msg: "All teachers"
    })

}



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

exports.createTeachers = (req, res) => {

    res.status(200).json({
        success: true,
        msg: "Create Teacher"
    })

}


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
