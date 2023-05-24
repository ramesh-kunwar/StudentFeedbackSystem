require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const app = express()


app.use(express.json())


// dev logging middleware
app.use(morgan("tiny"))


// Importing all routes

const teachersRoutes = require("./routes/teacherRoutes")










//  basic route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        msg: "Welcome to student teacher feedback app"
    })
})


// Mounting all routes

app.use("/api/v1/teachers", teachersRoutes)


// listening to port
app.listen(process.env.PORT, () => console.log(`App is running at port ${process.env.PORT}`))