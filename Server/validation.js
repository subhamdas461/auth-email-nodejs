const Joi = require("joi")

const signupValidate = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().max(128).email().required(),
        password: Joi.string().min(6).max(128).required()
    })
    return schema.validate(data)
}

module.exports.signupValidate = signupValidate