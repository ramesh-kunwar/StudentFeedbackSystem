const multer = require("multer");
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  //   if (!file.mimtype.startsWith("image")) {
  //     cg("Please upload image file", false);
  //   }

  cb(null, true); // first callback (null) is an error
};
multer({ storage, fileFilter });

exports.uploadImage = multer({ storage, fileFilter });
