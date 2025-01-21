const {empSignupValidation, empSignInValidation} = require("../config/joiValidation")

const empSignupValidationMiddleware = async (req, res, next) => {
    const {error} = empSignupValidation(req.body)
    const {name, role, email, password, repeat_password} = req.body
    if (!name || !role || !email || !password || !repeat_password) {
        return res.status(400).json({message: "Requiered field name, role, email, password, repeat_password in the req body"})
        
    }

    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

const empSignInValidationMiddleware = async (req, res, next) => {
    const {error} = empSignInValidation(req.body)
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: "Requiered field email & password in the req body"})
    }

    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

module.exports = {empSignupValidationMiddleware, empSignInValidationMiddleware}