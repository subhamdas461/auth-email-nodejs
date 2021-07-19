const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { genToken } = require("../controllers/authUser");
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = await req.body;
    if (email == "" || password == "") {
        return res.status(400).json({
            status: "error",
            msg: "Email or password cannot be empty!",
        });
    }
    const regUser = await User.findOne({ email });

    // let pass = await bcrypt.hash(password,7)

    if (!regUser) {
        return res.status(400).json({
            status: "error",
            msg: "Email-id not registered!",
        });
    }

    let isCorrectPass = await bcrypt.compare(password, regUser.password);
    let token = genToken({ name: regUser.name, email: regUser.email });
    if (isCorrectPass) {
        res.cookie("_ujt", token, {
            maxAge: 3600000,
            httpOnly: true,
        });
    }
    isCorrectPass
        ? res.redirect("/dashboard")
        : res.status(400).json({
              status: "error",
              msg: "Incorrect Credential",
          });
});

module.exports = router;
