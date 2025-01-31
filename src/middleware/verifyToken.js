const jwt = require("jsonwebtoken")
const customerModel = require("../models/customer")

const isAuthToken = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({message: "Access denied, token is required!"})
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verified
        // console.log(verified.role)
        // console.log(req.user.id)
        next()
    } catch (error) {
        // console.error(error)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        res.status(400).json({message: "Invalid token"})
    }
}

const authorizeCustToken = async (req, res, next) => {
    const {customer_id, name, email: userEmail} = req.user
    const {email} = req.body
    try {
        const [customer] = await customerModel.getCustByEmail(email)

        // console.log(customer_id, name, userEmail)
        // console.log(customer[0].customer_id, customer[0].name, customer[0].email)

        if (customer_id !== customer[0].customer_id || name !== customer[0].name || userEmail !== customer[0].email) {
            return res.status(403).json({message: "Forbidden. Token not yours!"})
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error!"
        })
        
    }
}

module.exports = {isAuthToken, authorizeCustToken}