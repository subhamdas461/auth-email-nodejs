const jwt = require("jsonwebtoken");
const express = require("express");

const app = express();

const genToken = (payload) => {
    const userToken = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "1h",
    });
    return userToken;
};
const verifyToken = (req, res, next) => {
    const token = req.cookies._ujt;

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            // res.status(403).json({
            //     status: "error",
            //     message: "Login required!",
            // });
            res.redirect("/login");
        }
        next();
    });
};
const isLoggedin = (req, res, next) => {
    const token = req.cookies._ujt;

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (decoded) {
            res.redirect("/dashboard");
        }
        next();
    });
};

module.exports = {
    isLoggedin,
    genToken,
    verifyToken,
};
