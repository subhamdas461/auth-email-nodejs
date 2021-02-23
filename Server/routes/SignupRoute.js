const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router();

const User = require("../models/user")


router.post("/",async (req,res)=>{
   
    
    const {name ,email ,password:pass} = await req.body
    console.log(req.body)
    let password = await bcrypt.hash(pass,7);
    let user = new User({
        name,
        email,
        password
    });
    user.save((err,doc)=>{
        // console.log(JSON.stringify(err))
        try {
            if(err){
                if(err.code === 11000){
                    throw new Error("Email already registered");
                }
                throw new Error(err)
            }
            console.log("Doc",doc)
            res.status(201).json({
                status:"ok",
                msg:"Saved to db"
            })
            res.end()
        }catch (error) {
            console.log(error)
            res.status(400).json({
                status:"error",
                msg: error.message
            })
            res.end()   
        } 
    })
})

module.exports = router;