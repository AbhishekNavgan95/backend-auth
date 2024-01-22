const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middleware
exports.auth = (req, res, next) => {
  try {

    // extracting jwt token from autorizations headers are prefferred
    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    // if token is not available
    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "token not available!",
      });
    }

    // verify the token
    try {
      // jwt.verify() converts token into a plane object containing 
      // values present in the token by using the secret key used for creating the token
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // asigning decoded object to user for next middlewares
      // so that jwt token need not to be varified again and again and also we can handle properties of respective user if needed
      req.user = payload;

    } catch (e) {

      // something went wrong while decoding the token
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });

    }

    next(); // call next middleware
  } catch (e) {

    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying the token",
    });

  }
};

// middleware for verifying students
exports.isStudent = (req, res, next) => {
  try {

    // checking user role
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for students",
      });
    }

    // functionality goes here

    next(); // call next middleware
  } catch (e) {

    return res.status(500).json({
      success: false,
      message: "user role cannot be varified",
    });

  }
};

// middleware for verifying admin
exports.isAdmin = (req, res, next) => {
  try {

    // checking user role
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for admin",
      });
    }

    // functionality goes here

    next(); // call next middleware
  } catch (e) {

    return res.status(500).json({
      success: false,
      message: "user role cannot be varified",
    });

  }
};
