//VALIDATION
const Joi = require('joi');

const registerValidation = (data) => {
    //VALIDATION FOR NEW REGISTRATION
    const schema = Joi.object({
        email: Joi.string().min(5).max(64).required().email(),
        password: Joi.string().min(6).max(64).required(),
        first_name: Joi.string().required().alphanum(),
        last_name: Joi.string().required().alphanum(),
        is_alumni: Joi.boolean().required(),
        description: Joi.string(),
        time_slot: Joi.any()
    })
    return schema.validate(data)
}



const loginValidation = (data) => {
    //VALIDATION FOR LOGIN
    const schema = Joi.object({
        email: Joi.string().min(5).max(64).required().email(),
        password: Joi.string().min(6).max(64).required()
        
    })
    return schema.validate(data)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation