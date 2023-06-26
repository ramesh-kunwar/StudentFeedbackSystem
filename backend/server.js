require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/connect");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

connectDB();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

app.use(morgan("tiny"));

// Importing all routes

const teachersRoutes = require("./routes/teacherRoutes");
const semesterRoutes = require("./routes/semesterRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const errorHander = require("./middleware/error");

//  basic route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Welcome to student teacher feedback app",
  });
});

// Mounting all routes

app.use("/api/v1/teachers", teachersRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/semesters", semesterRoutes);
app.use("/api/v1/upload", uploadRoutes);

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// error handler
app.use(errorHander);

// listening to port
app.listen(process.env.PORT, () =>
  console.log(`App is running at port ${process.env.PORT}`)
);
