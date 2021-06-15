const express = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const router = express.Router();

router.get("/", async (req,res)=>{
    try {
        const paramsToken = req.query.token;
       
        const user = await User.findOne({emailToken : paramsToken})
        if(!user){
            document.cookie = "cdcd"
            throw Error("Invalid token or email already verified");
        }
        

        jwt.verify(paramsToken, process.env.JWT_KEY, (err, verified) => {
            if (err) {
                console.log(err)
                throw Error(err);
            }
            if (verified.uEmail === user.email) {
                user.emailToken = null;
                user.isVerified = true;
                user.save();
                res.redirect("/success")
            }

        })
        
        
        // res.status(200).json({
        //     status:"success",
        //     msg:"Email Verified!"
        // })
      
    
    } catch (error) {
        res.status(404).json({
            status:"error",
            msg:error.message
        })
    }
})

module.exports = router;