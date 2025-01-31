const employeeModel = require('../models/employee')
const customerModel = require("../models/customer")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const employeeSignIn = async (req, res) => {
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

const custSignUp = async (req, res) => {
    const {name, email, password} = req.body
    const isEmailExist = await customerModel.getCustByEmail(email)

    if (isEmailExist[0].length > 0) {
        return res.status(400).json({
            message: "Email already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newCustomer = {name, email, hashedPassword}

    try {
        const data = await customerModel.addCustomer(newCustomer)

        const newCustWithId = {
            customer_id: data[0].insertId,
            ...newCustomer
        }

        res.status(200).json({
            message: "Customer added successfully",
            data: newCustWithId
        })
    } catch (error) {
        // console.error(error)
        res.status(500).json({
            message: "Internal Server error!"
        })
    }
}

const custSignIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const [customer] = await customerModel.getCustByEmail(email)

        if (customer.length === 0) {
            return res.status(400).json({
                message: "Invalid email!"
            })
        }

        const isPasswordMatch = bcrypt.compareSync(password, customer[0].password)

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({customer_id: customer[0].customer_id, name: customer[0].name, email: customer[0].email}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

        res.status(200).json({
            message: "Customer Sign-In success",
            data: {
                account: {
                    id: customer[0].customer_id,
                    email: customer[0].email
                },
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

module.exports = {employeeSignIn, custSignUp, custSignIn}