const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const Semester = require("../models/semester");
const errorHander = require("../middleware/error");
/**********************************
 *      @desc Get all semester
 *      @route GET /api/v1/semesters
 *      @access Public
/**********************************/

exports.getSemesters = asyncHandler(async (req, res) => {
  const semester = await Semester.find();

  res.status(200).json({
    success: true,
    count: semester.length,
    data: semester,
  });
});

/**********************************
 *      @desc Get single semester
 *      @route GET /api/v1/semester/:id
 *      @access Public
/**********************************/

exports.getSemester = asyncHandler(async (req, res, next) => {
  const semester = await Semester.findById(req.params.id);

  if (!semester) {
    return next(
      new ErrorResponse(`No semester found with id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: semester,
  });
});

/**********************************
 *      @desc Create semester
 *      @route POST /api/v1/semesters
 *      @access PRIVATE
/**********************************/

exports.createSemester = asyncHandler(async (req, res, next) => {
  // check for existign teacher
  const { name, description, coursesTaught } = req.body;

  if (!name || !description) {
    return next(new ErrorResponse("Name, description  are required", 401));
  }

  // Checking for existing user
  const existingSemester = await Semester.findOne({ name });

  if (existingTeacher) {
    return next(new ErrorResponse("Semester already exists", 400));
  }
  // Create teacher
  const semester = await Semester.create(req.body);

  res.status(201).json({
    success: true,
    data: semester,
  });
});

/**********************************
 *      @desc Update Semester
 *      @route PUT /api/v1/semesters/:id
 *      @access PRIVATE
/**********************************/

exports.updateSemester = asyncHandler(async (req, res, next) => {
  const { name, description, coursesTaught } = req.body;

  const semester = await Semester.findById(req.params.id);

  if (!semester) {
    return next(
      new ErrorResponse(`No semester found with id : ${req.params.id}`, 404)
    );
  }

  if (semester) {
    (semester.name = name),
      (semester.description = description),
      (semester.coursesTaught = coursesTaught);

    const updateSemester = await semester.save();
    res.status(200).json({
      success: true,
      photo,
      updateSemester,
    });
  }
});

/**********************************
 *      @desc Delete Teacher
 *      @route DELETE /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.deleteSemester = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(
      ErrorResponse(`No semester found with id : ${req.params.id}`, 404)
    );
  }

  const semester = await Semester.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: semester,
  });
});

exports.createTeacherReview = asyncHandler(async (req, res, next) => {
  const {
    rating,
    comment,
    teachingSkill,
    communicationSkill,
    resourceProvided,
  } = req.body;

  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse("Teacher not found ", 404));
  }

  if (teacher) {
    const alreadyReviewed = teacher.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return next(new ErrorResponse("Teacher already reviewed", 400));
    }
    const review = {
      teachingSkill: Number(teachingSkill),
      communicationSkill: Number(communicationSkill),
      resourceProvided: Number(resourceProvided),

      name: req.user.name,
      averageRating: (
        (Number(communicationSkill) +
          Number(teachingSkill) +
          Number(resourceProvided)) /
        3
      ).toFixed(2),
      comment,
      user: req.user._id,
    };

    teacher.reviews.push(review);

    teacher.numOfReviews = teacher.reviews.length;

    // teaching skill
    teacher.teachingSkill =
      teacher.reviews
        .filter((review) => !isNaN(review.teachingSkill))
        .reduce((acc, review) => acc + review.teachingSkill, 0) /
      teacher.reviews.length;

    // communicatin skill
    teacher.communicationSkill =
      teacher.reviews
        .filter((review) => !isNaN(review.communicationSkill))
        .reduce((acc, review) => acc + review.communicationSkill, 0) /
      teacher.reviews.length;

    // resource provided
    teacher.resourceProvided =
      teacher.reviews
        .filter((review) => !isNaN(review.resourceProvided))
        .reduce((acc, review) => acc + review.resourceProvided, 0) /
      teacher.reviews.length;

    // rating
    teacher.rating =
      teacher.reviews.reduce((acc, review) => acc + review.averageRating, 0) /
      teacher.numOfReviews;

    await teacher.save();

    res.status(201).json({
      message: "Review Added",
    });
  }
});
