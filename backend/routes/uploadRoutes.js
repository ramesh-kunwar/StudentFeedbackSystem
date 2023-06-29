const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // cb(null, "uploads/");
    // cb(null, "./frontend/uploads/");

    cb(null, "../frontend/uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    // res.status(200).send({
    //   message: "Image uploaded successfully",
    //   image: `/uploads/${req.file.filename}`,
    // });

    const imagePath = `/uploads/${req.file.filename}`;

    // Resize the image using sharp library
    sharp(req.file.path)
      .resize(300, 300) // Set your desired width and height
      .toFile(req.file.path.replace(path.extname(req.file.path), '.jpg'))
      .then(() => {
        res.status(200).send({
          message: "Image uploaded and resized successfully",
          image: imagePath,
        });
      })
      .catch((resizeErr) => {
        res.status(400).send({ message: resizeErr.message });
      });
  });
});

module.exports = router;
