const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const path = require("path");
const signupRoute = require("./routes/SignupRoute");
const loginRoute = require("./routes/LoginRoute");
const verifyRoute = require("./routes/verifyRoute");
const morgan = require("morgan");
require('dotenv').config();

const app = express();

// db require
require("./models/db")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
// app.use(cors())
app.use(express.json())
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname , "../public")))
// all static public folder
app.get('/signup', function (req, res, next) { 
    res.sendFile(path.join(__dirname, "../") + "/public/signup.html");
}) 
app.get('/login', function (req, res, next) { 
    res.sendFile(path.join(__dirname, "../") + "/public/login.html");
}) 
app.get('/dashboard', function (req, res, next) { 
    res.sendFile(path.join(__dirname, "../") + "/public/dashboard.html");
}) 
app.get('/forgot-password', function (req, res, next) { 
    res.sendFile(path.join(__dirname, "../") + "/public/forgotPass.html");
}) 

// post signup route
app.use("/api/user/signup",signupRoute);

// post login route
app.use("/api/user/login",loginRoute);

// Verify email route.
app.use("/verify-email",verifyRoute)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server running on port : ${port}`)
})