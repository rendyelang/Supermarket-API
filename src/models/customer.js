const db = require("../config/db")

// Check if customer exist by email
const getCustByEmail = (email) => {
    const sqlQuery = "SELECT * FROM customers WHERE email = ?"
    return db.promise().query(sqlQuery, [email])
}

// Add a new customer
const addCustomer = (newCustomer) => {
    const {name, email, hashedPassword} = newCustomer

    const sqlQuery = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)"
    return db.promise().query(sqlQuery, [name, email, hashedPassword])
}

// Get all customer data
const getAllCustomer = () => {
    const sqlQuery = "SELECT * FROM customers"
    return db.promise().query(sqlQuery)
}

// Get customer by name
const getCustByName = (name) => {
    const sqlQuery = "SELECT * FROM customers WHERE name LIKE ?"
    const keyword = `%${name}%`
    return db.promise().query(sqlQuery, [keyword])
}

// Edit customer password by email
const editCustPassByEmail = (email, newPass) => {
    const sqlQuery = "UPDATE customers SET password = ? WHERE email = ?"
    return db.promise().query(sqlQuery, [newPass, email])
}

// Get customer by id
const getCustById = (id) => {
    const sqlQuery = "SELECT * FROM customers WHERE customer_id = ?"
    return db.promise().query(sqlQuery, [id])
}

module.exports = {getCustByEmail, addCustomer, getAllCustomer, getCustByName, editCustPassByEmail, getCustById}