const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        minLength : 3,
        maxLength : 30,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minLength : 6,
        required : true
    }
},{
    collection :'users'
});

module.exports = mongoose.model("userSchema",userSchema)