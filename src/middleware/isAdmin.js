const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({message: "Forbidden. Only admin can access this route!"})
        }
        next()
    } catch (error) {
        return res.status(401).json({message: "Only admin can access this route!"})
    }
}

module.exports = isAdmin