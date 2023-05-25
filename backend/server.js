require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const connectDB = require('./config/connect')

const app = express()

connectDB()

app.use(express.json())


// dev logging middleware
app.use(morgan("tiny"))


// Importing all routes

const teachersRoutes = require("./routes/teacherRoutes")
const errorHander = require('./middleware/error')











//  basic route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Welcome to student teacher feedback app"
    })
})


// Mounting all routes

app.use("/api/v1/teachers", teachersRoutes)


// error handler
app.use(errorHander)


// listening to port
app.listen(process.env.PORT, () => console.log(`App is running at port ${process.env.PORT}`))