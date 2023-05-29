require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/connect");
const cookieParser = require('cookie-parser')

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());


// dev logging middleware
app.use(morgan("tiny"));

// Importing all routes

const teachersRoutes = require("./routes/teacherRoutes");
const userRoutes = require("./routes/userRoutes");

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

// error handler
app.use(errorHander);

// listening to port
app.listen(process.env.PORT, () =>
  console.log(`App is running at port ${process.env.PORT}`)
);
