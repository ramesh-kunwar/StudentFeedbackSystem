const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/ErrorResponse");
const Teacher = require("../models/teacher");
const errorHander = require("../middleware/error");
const cloudinary = require("cloudinary").v2;
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
  // check for existign teacher
  // const { name, description, coursesTaught } = req.body;
  const { name, description, image, coursesTaught } = req.body;

  if (!name || !description) {
    return next(
      new ErrorResponse(
        "Name, description, photos, coursesTaught are required",
        401
      )
    );
  }

  // if (!req.files) {
  //   return next(new ErrorResponse("Image is required", 401));
  // }

  // // uploading image
  // if (req.files) {
  //   const result = await cloudinary.uploader.upload(
  //     req.files.photos.tempFilePath
  //   );
  //   const photosObj = {
  //     id: result.public_id,
  //     secure_url: result.secure_url,
  //   };

  //   req.body.photos = photosObj;
  // }

  // Checking for existing user
  const existingTeacher = await Teacher.findOne({ name });

  if (existingTeacher) {
    return next(new ErrorResponse("Teacher already exists", 400));
  }
  // Create teacher
  const teacher = await Teacher.create(req.body);

  res.status(201).json({
    success: true,
    data: teacher,
  });
});

/**********************************
 *      @desc Update Teacher
 *      @route PUT /api/v1/teachers/:id
 *      @access PRIVATE
/**********************************/

exports.updateTeachers = asyncHandler(async (req, res, next) => {
  const { name, description, coursesTaught, image } = req.body;

  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse(`No teacher found with id : ${req.params.id}`, 404)
    );
  }

  if (teacher) {
    (teacher.name = name),
      (teacher.description = description),
      (teacher.coursesTaught = coursesTaught);
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

exports.createdTeacherReview = asyncHandler(async (req, res) => {
  const { averageRating, comment } = req.body;

  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    const alreadyReviewed = teacher.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return next(new ErrorResponse("Product already reviewed", 400));
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
  }
});
