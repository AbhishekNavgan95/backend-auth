const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDB = () => {

    // connecting to db
    mongoose.connect(process.env.DATA_BASE_URL, {})
    .then(() => {
        // if success
        console.log("connected to DB")
    })
    .catch((e) => {
        // if failed
        console.log("error while connecting to server!")
        console.eroor(e);
        // stops execusion of program in case of failure to connect with db
        process.exit(1); 
    })
}