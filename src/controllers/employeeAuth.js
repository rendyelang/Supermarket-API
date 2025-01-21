const employeeModel = require('../models/employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const [employee] = await employeeModel.isEmailEmployeeExist(email)
        // console.log(employee)
        
        if (employee.length === 0) {
            return res.status(400).json({
                message: "Invalid email"
            })
        }
    
        const isPasswordMatch = bcrypt.compareSync(password, employee[0].password)
    
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }
    
        const token = jwt.sign({id: employee[0].employee_id, email: employee[0].email, role: employee[0].role}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
    
        res.status(200).json({
            message: "Sign in success",
            data: {
                account: {
                    id: employee[0].employee_id,
                    email: employee[0].email,
                    role: employee[0].role
                },
                token: token
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {signIn}