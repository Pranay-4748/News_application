const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
});

const usermodel = mongoose.model("user",userSchema);
module.exports = usermodel;