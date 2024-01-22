// creating express app
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")

// importing env vars
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware to parse cookies
app.use(cookieParser());

// middleware to parse req into json format
app.use(express.json());

// call to connect to db
require("./config/database").connectToDB();

// import routes and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// starting server
app.listen(PORT, ()=> {
    console.log("app is listening at port ", PORT)
})