const express = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/", async (req,res,next)=>{
    try {
        const paramsToken = req.query.token;
        const user = await User.findOne({emailToken : paramsToken})
        if(!user){
            throw Error("Something went wrong! Invalid token");
        }
        user.emailToken=null;
        user.isVerified=true;
        await user.updateOne();
        
        res.status(200).json({
            status:"success",
            msg:"Email Verified!"
        })
      
    
    } catch (error) {
        res.status(404).json({
            status:"error",
            msg:error.message
        })
    }
})

module.exports = router;