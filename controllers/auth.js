const bcrypt = require("bcrypt"); // for hashing password
const User = require("../models/user"); // user schema
const jwt = require("jsonwebtoken"); // for creating jwt token
require("dotenv").config(); // importing env vars

exports.signup = async (req, res) => {
  try {

    // destructuring values from req body
    const { name, email, password, role } = req.body;

    // check if user already exist in db
    const existingUser = await User.findOne({ email });

    // if user does not exist 
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with courrousponding email already exists!",
      });
    }

    // hashing password
    let hashedPassword;
    try {
      // bcrypt.hash() used to hashing a password and takes two arguments 
      // 1 -> the value to be hached 
      // 2 -> precision of hashing " 10 is a preferred value"
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      
      // error occured while hashing the password
      return res.status(500).json({
        success: false,
        message: "password encryption failed",
      });
    }

    // create user in DB along with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // send success res to frontend 
    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (e) {

    // some error occurred
    return res.status(500).json({
      success: false,
      message: "internal server error, user cannot be rugistered",
    });
  }
};

exports.login = async (req, res) => {
  try {

    // destructuring password and email
    const { email, password } = req.body;

    // checking for empty values
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details!!",
      });
    }

    // checking if user exists in db or not
    const user = await User.findOne({ email });

    // if user does not exist in db
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // creating a temperory instance of the user for creating token
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    // comparing provided password with password saved into the db
    // bcrypt.comapre() used for comparing hashed and unhashed password
    if (await bcrypt.compare(password, user.password)) {
      // password matched

      // creating jwt token by using values fetched from db for auth
      // jwt.sign() used for creting new token and takes 3 arguments
      // 1 -> payload i.e the values used for creating token
      // 2 -> secret key initialized in .env
      // 3 -> object specifying properties for token such as expiry date
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // folllowing line is needed because sometimes the db returns an unmutable object 
      // i.e. we cannot override the properties of it so in order to convert it into 
      // an mutable object we need to use obj.toObject() function 
      newUser = user.toObject(); 

      // attacking token with the user instance for sending to the frontend
      newUser.token = token;

      // password is removed while sending details to the fontend for obvious reasons
      newUser.password = undefined;

      // creating options (parameters) for cookie
      const options = {
        expires: new Date(Date.now() + 30000), // expires in 30 secs
        httpOnly: true, // makes the cookie unaccessible in frontend
      };

      // sending cookie and success res to frontend
      // creating cookie requires 2 arguments 
      // 1 -> name of the cookie
      // 2 -> {} options such as expiration time and frontend access permissions
      // we are also sending token with the cookie for testing authentication 
      // #notPreffered -> authorizations header are prefferred
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        newUser,
        message: "User logged in successfully",
      });

    } else {
      // password do not matched
      return res.status(403).json({
        success: false,
        message: "password incorrect",
      });
    }
  } catch (e) {

    // some error happened
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });

  }
}