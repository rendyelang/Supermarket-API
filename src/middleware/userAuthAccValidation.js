const {empSignupValidation, signInValidation, custSignUpValidation} = require("../config/joiValidation")

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

const signInValidationMiddleware = async (req, res, next) => {
    const {error} = signInValidation(req.body)
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: "Requiered field email & password in the req body"})
    }

    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

const custSignUpValidationMiddleware = async (req, res, next) => {
    const {error} = custSignUpValidation(req.body)
    const {name, email, password, repeat_password} = req.body

    if (!name, !email, !password, !repeat_password) {
        return res.status(400).json({message: "Required field name, email, password, repeat_password"})
    }

    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }

    next()
}

module.exports = {empSignupValidationMiddleware, signInValidationMiddleware, custSignUpValidationMiddleware}