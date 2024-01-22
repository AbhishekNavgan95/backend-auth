const mongoose = require("mongoose");

// creating user schema
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ["Admin", "Student", "Visitor"]  
    }
})

// exporting user schema to controllers
module.exports = mongoose.model("User", userSchema)