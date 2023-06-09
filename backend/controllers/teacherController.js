const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const Teacher = require("../models/teacher");
/**********************************
 *      @desc Get all teachers
 *      @route GET /api/v1/teachers
 *      @access Public
/**********************************/

exports.getTeachers = asyncHandler(async (req, res) => {
  const teacher = await Teacher.find();

  res.status(200).json({
    success: true,
    count: teacher.length,
    data: teacher,
  });
});

/**********************************
 *      @desc Get single teacher
 *      @route GET /api/v1/teachers/:id
 *      @access Public
/**********************************/

exports.getTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse(`No teacher found with id : ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: teacher,
  });
});

/**********************************
 *      @desc Create Teacher
 *      @route POST /api/v1/teachers
 *      @access PRIVATE
/**********************************/

exports.createTeachers = asyncHandler(async (req, res, next) => {
  console.log(req.file);

  // check for existign teacher
  const { name, description, coursesTaught, image } = req.body;
  if(!name || !description || !coursesTaught || !image){
    return next(new ErrorResponse("All fields are required", 401));

  }

  // Checking for existing user
  const existingTeacher = await Teacher.findOne({ name });

  if (existingTeacher) {
    return next(new ErrorResponse("Teacher already exists", 400));
  }
  // Create teacher
  const teacher = await Teacher.create({
    name,
    description,
    coursesTaught,
    image
  });

  res.status(201).json({
    success: true,
    data: teacher,
    image,
  });
});

/**********************************
 *      @desc Update Teacher
 *      @route PUT /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.updateTeachers = asyncHandler(async (req, res, next) => {
  const { name, description, coursesTaught, photo, image } = req.body;

  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse(`No teacher found with id : ${req.params.id}`, 404)
    );
  }

  if (teacher) {
    teacher.name = name;
    teacher.description = description;
    teacher.coursesTaught = coursesTaught;
    teacher.image = image;

    const updatedTeacher = await teacher.save();
    res.status(200).json({
      success: true,
      image,
      updatedTeacher,
    });
  }
});

/**********************************
 *      @desc Delete Teacher
 *      @route DELETE /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.deleteTeachers = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(
      ErrorResponse(`No teacher found with id : ${req.params.id}`, 404)
    );
  }

  const teacher = await Teacher.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: teacher,
  });
});

// Review Teacher

exports.createTeacherReview = asyncHandler(async (req, res, next) => {
  const { comment, teachingSkill, communicationSkill, resourceProvided } =
    req.body;

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

    console.log(req.user);
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
