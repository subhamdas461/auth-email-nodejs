const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        minLength : [3, "Name must be atleast 3 characters long"],
        maxLength : [50, "Name must be less than 50 characters"],
        required : [true, "Name is required"],
        trim :true
    },
    email : {
        type : String,
        required :[true, "Email is required"],
        unique : [true, "Email already exists"],
        trim :true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    emailToken : {
        type: String
    },
    password : {
        type : String,
        minLength : [3, "Password must be atleast 6 characters long"],
        required : [true, "Password is required"]
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    timestamp : {
        type : Number
    }
},{
    collection :'users'
});


module.exports = mongoose.model("userSchema",userSchema)

