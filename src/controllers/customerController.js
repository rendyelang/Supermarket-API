const customerModel = require("../models/customer")
const bcrypt = require("bcrypt")
const {passwordPatternValidation} = require("../config/joiValidation")

// Get all customers data
const getAllCustomers = async (req, res) => {
    try {
        const [datas] = await customerModel.getAllCustomer()
        res.status(200).json({
            message: "Get all customers success",
            data: datas
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

// Get customer profile by name
const getCustByName = async (req, res) => {
    const name = req.query.name

    if (!name) {
        return res.status(400).json({
            message: "name query can't be empty"
        })
    }

    try {
        const [data] = await customerModel.getCustByName(name)

        if (data.length) {
            res.status(200).json({
                message: `Get customer profile by name ${name} success`,
                data: data
            })
        } else {
            res.status(404).json({
                message: `Customer with name ${name} doesn't exist`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}

// PATCH edit customer password by email
const changePasswordCust = async (req, res) => {
    const {email, current_password, new_password} = req.body

    if (!email || !current_password || !new_password) {
        return res.status(400).json({
            message: "Required field email, current_password, and newPassoword"
        })
    }

    const [customer] = await customerModel.getCustByEmail(email)
    // console.log(customer[0].password)

    if (customer.length === 0) {
        return res.status(404).json({
            message: "Account doesn't exists"
        })
    }

    try {
        const isPasswordMatch = bcrypt.compareSync(current_password, customer[0].password)
        // console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid current password"
            })
        }

        const {error} = passwordPatternValidation(new_password)
        console.log(error)

        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }

        const hashedNewPass = await bcrypt.hash(new_password, 10)

        const newCredentials = await customerModel.editCustPassByEmail(email, hashedNewPass)
        // console.log(newCredentials)
        res.status(200).json({
            message: `Password changed successfully for email ${email}`
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}


module.exports = {getAllCustomers, getCustByName, changePasswordCust}