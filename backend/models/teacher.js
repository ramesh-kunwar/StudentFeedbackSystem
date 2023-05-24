
const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({

    name: {
        type: String,
        reqired: [true, 'Teacher name is required'],
    },
    description: {
        type: String,
    },
    averageRating: {
        type: Number,
        min: [1, "Rating must be atleast 1"],
        max: [5, "Rating cant be more than 5"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }

})


module.exports = mongoose.model("Teacher", teacherSchema)