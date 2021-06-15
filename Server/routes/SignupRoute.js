const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router();
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const { signupValidate } = require("../validation")

router.post("/",async (req,res)=>{
    const {name ,email ,password} = await req.body
    const testData = {
        name : checkExtraWhiteSpce(name),
        email : checkExtraWhiteSpce(email),
        password : checkExtraWhiteSpce(password)
    }
    const {error} =signupValidate(testData);
    if(error){
        return res.status(400).json({
            status : "error",
            msg : error.details[0].message
        })
    }
    
    let hashPass = await bcrypt.hash(password,7); 
    let userData = {
        name : checkExtraWhiteSpce(name),
        email : checkExtraWhiteSpce(email),
        password : hashPass,
        isVerified: false,
        timestamp : Date.now()
    }
    
    // Check for duplicate email entry
    let emailExist = await User.findOne({email : userData.email})
    if(emailExist) return res.status(409).json({
        status:"error",
        msg: "Email already exists!"
    })
    
    let {name:uName, email:uEmail } = userData
    const token = jwt.sign({uName,uEmail},process.env.JWT_KEY,{expiresIn: "10m"})
    userData.emailToken = token;
    console.log(token,userData)
    // console.log(uName,uPass,uEmail)

    // Send verification mail setup
    sgMail.setApiKey(process.env.SEND_API_KEY)
    const msg = {
        to: userData.email,
        from: {
            name : "ResumeJH.com",
            email : "cshadow439@gmail.com"
        }, 
        subject: `Verify your account`,
        html: `<p>Hello ${userData.name}</p>
        <h2>Verify your account</h2>
        <p>Press the verify button to verify your account</p>
        <a href="${req.protocol}://${req.headers.host}/verify-email?token=${token}">Verify</a>
        <hr>
        <code>${req.protocol}://${req.headers.host}/verify-email?token=${token}</code>
        <p>The link will expire in 10 minutes</p>`,
        text: `Hello ${userData.name} 
                Copy this link and open in new tab - ${req.protocol}://${req.headers.host}/verify-email?token=${token}`
    }

    await sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error("Email not sent : ",error)
        res.status(500).json({
            status:"error",
            msg: "Email not sent!"
        })
    })

    let user = new User(userData);
    user.save((err,doc)=>{
        try {
            if(err){
                if(err.code === 11000){
                    throw Error(JSON.stringify({
                        msg : "Email already exists.",
                        statusCode : 409
                    }))
                }
                throw Error(JSON.stringify({
                    msg : err.message,
                    statusCode : 400
                }))
            }
            console.log("Doc : ",doc)
            res.status(201).json({
                status:"ok",
                msg:`A verification link has been sent to ${doc.email}.`
            })
            res.end()
        }catch (error) {
            let err = JSON.parse(error.message);
            res.status(err.statusCode).json({
                status:"error",
                msg: err.msg
            })
        } 
    })
})
// check for unwanted white spaces
function checkExtraWhiteSpce(sentence){
    return sentence.replace(/\s+/g, ' ').trim();
}
module.exports = router;