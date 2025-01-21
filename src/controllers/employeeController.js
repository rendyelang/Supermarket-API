const employeeModel = require('../models/employee')
const bcrypt = require('bcrypt')

// POST: Add a new employee
const addEmployee = async (req, res) => {
    const {name, role, email, password} = req.body

    const isEmailExist = await employeeModel.isEmailEmployeeExist(email)
    if (isEmailExist[0].length > 0) {
        return res.status(400).json({
            message: "Email already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newEmployee = {
        name, role, email, hashedPassword
    }

    try {
        const data = await employeeModel.addEmployee(newEmployee)

        const employeeWithId = {
            employee_id: data[0].insertId,
            ...newEmployee
        }

        res.status(201).json({
            message: "Employee added successfully",
            data: employeeWithId
        })
    } catch (error) {
        // console.error(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// GET: Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const [data] = await employeeModel.getAllEmployees()
        res.status(200).json({
            message: "Get all employees success",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// GET: Get employees by role
const getEmployeeByRole = async (req, res) => {
    const role = req.query.role

    if (!role) {
        return res.status(400).json({
            message: "Role query cannot be empty"
        })
    }

    try {
        const [data] = await employeeModel.getEmployeeByRole(role)
        if (data.length) {
            res.status(200).json({
                message: `Get employees by role ${role} success`,
                data: data
            })
        } else {
            res.status(404).json({
                message: `Employee with role ${role} not found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// PATCH: Edit employee data by ID
const editEmployee = async (req, res) => {
    const id = req.params.id
    const {name, role} = req.body

    if (!name || !role) {
        return res.status(400).json({
            message: "required new name and role in request body"
        })
    }

    try {
        const employeeEdited = {name, role}
        req.baru = employeeEdited
        const [data] = await employeeModel.editEmployee(id, employeeEdited)

        
        // console.log(data)
        // console.log(req.baru)
        if (data.affectedRows) {
            const [employee] = await employeeModel.getEmployeeById(id)
            // console.log(employee[0].email)

            res.status(200).json({
                message: `Employee with ID ${id} has been edited successfully`,
                newData: {
                    employee_id: id,
                    ...employeeEdited,
                    email: employee[0].email
                }
            })
        } else {
            res.status(404).json({
                message: `Employee with ID ${id} not found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// DELETE: Delete employee by ID
const deleteEmployee = async (req, res) => {
    const id = req.params.id

    if (!id) {
        return res.status(500).json({
            message: "Required parameter ID"
        })
    }

    try {
        const [data] = await employeeModel.deleteEmployee(id)

        if (data.affectedRows) {
            res.status(200).json({
                message: `Employee with id ${id} deleted`
            })
        } else {
            res.status(404).json({
                message: `Employee with id ${id} not found`
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            messaga: "Internal server error!"
        })
    }
}

module.exports = {addEmployee, getAllEmployees, getEmployeeByRole, editEmployee, deleteEmployee}