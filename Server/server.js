const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const signupRoute = require("./routes/SignupRoute")
require('dotenv').config();

const app = express();

// db require
require("./models/db")

app.use(cors())
app.use(express.json())
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

// post signup route
app.use("/api/signup",signupRoute);

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server running on port : ${port}`)
})