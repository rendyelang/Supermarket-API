const Joi = require("joi")

const empSignupValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                "string.base": "Name must be a string!",
                "any.required": "Name is required!"
            }),
        role: Joi.string()
            .required()
            .messages({
                "string.base": "Role must be a string!",
                "any.required": "Role is required!"
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.base": "Email must be a string!",
                "string.email": "Email must be a valid email address!",
                "any.required": "Email is required!"
            }),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) // Simbol, huruf besar, huruf kecil, dan angka
            .required()
            .messages({
                "string.pattern.base": "Passwords must consist of uppercase letters, lowercase letters, numbers, and symbols!",
                "string.min": "Passwords must have at least 8 characters!",
                "any.required": "Password required!"
            }),
        repeat_password: Joi.any()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": "Password confirmation must be matched!",
                "any.required": "Password confirmation required!"
            }),
    })

    return schema.validate(data)
}

const empSignInValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                "string.base": "Email must be a string!",
                "string.email": "Email must be a valid email address!",
                "any.required": "Email is required!"
            }),
        password: Joi
            .required()
            .messages({
                "any.required": "Password is required!"
            })
    })

    return schema.validate(data)
}

module.exports = {empSignupValidation, empSignInValidation}