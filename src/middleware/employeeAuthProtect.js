const jwt = require("jsonwebtoken")

const isAuthToken = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({message: "Access denied, token is required!"})
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verified
        // console.log(verified)
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

// const isAuthorizeToken = (req, res, next) => {
//     const {id, email, password} = req.user

//     if (req.user.id !== id || req.user.email !== email || req.user.password !== password) {
//         return res.status(403).json({message: "Forbidden. User mismatch!"})
        
//     }
//     next()
// }

module.exports = {isAuthToken}