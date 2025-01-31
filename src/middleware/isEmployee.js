const isEmployeeToken = (req, res, next) => {
    try {
        if (req.user.role === undefined) {
            return res.status(400).json({
                message: "Forbiden! that's not employee token"
            })
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

module.exports = isEmployeeToken