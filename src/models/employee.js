const db = require('../config/db');

// To check employee existance by email
const isEmailEmployeeExist = (email) => {
    const sqlQuery = "SELECT * FROM employees WHERE email = ?"
    return db.promise().query(sqlQuery, [email])
}

// To add a new employee
const addEmployee = (newEmployee) => {
    const {name, role, email, hashedPassword} = newEmployee

    const sqlQuery = "INSERT INTO employees (name, role, email, password) VALUES (?, ?, ?, ?)"
    return db.promise().query(sqlQuery, [name, role, email, hashedPassword])
}

// To display all employees
const getAllEmployees = () => {
    const sqlQuery = "SELECT * FROM employees"
    return db.promise().query(sqlQuery)
}

// To display employees by role
const getEmployeeByRole = (role) => {
    const sqlQuery = "SELECT * FROM employees WHERE role LIKE ?"
    const keyword = `%${role}%`
    return db.promise().query(sqlQuery, [keyword])
}

// To edit employee data by ID
const editEmployee = (id, editedEmployee) => {
    const {name, role} = editedEmployee
    const sqlQuery = "UPDATE employees SET name = ?, role = ? WHERE employee_id = ?"
    return db.promise().query(sqlQuery, [name, role, id])
}

// To get employee by ID
const getEmployeeById = (id) => {
    const sqlQuery = "SELECT * FROM employees WHERE employee_id = ?"
    return db.promise().query(sqlQuery, [id])
}

// To delete employee by ID
const deleteEmployee = (id) => {
    const sqlQuery = "DELETE FROM employees WHERE employee_id = ?"
    return db.promise().query(sqlQuery, [id])
}

module.exports = {addEmployee, isEmailEmployeeExist, getAllEmployees, getEmployeeByRole, editEmployee, getEmployeeById, deleteEmployee}