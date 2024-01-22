// taking instance of express Ruter for creating routes
const express = require("express");
const router = express.Router();

// import controllers form controllers
const { signup, login } = require("../controllers/auth");
// import middlewares from middleware 
const {auth, isStudent, isAdmin} = require('../middlewares/auth')

// mapping routes with respective handlers
router.post("/login", login);
router.post("/signup", signup);

// mapping middlewares

// a request travels from all the middlewares mentioned into
//  that route before calling the callback function

// test route
router.get("/test", auth, (req,res) => {
    res.json({
        success : true,
        message : "welcome to the testing route"
    })
})

// route for the student
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "this is a protected route for the student"
    })
})

// route for the admin
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "this is a protected route for the Admin"
    })
})

// exporting router to index.js
module.exports = router;