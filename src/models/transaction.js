const db = require("../config/db")

// POST: create a new transaction
const createTransaction = (newTransaction) => {
    const {customer_id, employee_id, transaction_date} = newTransaction

    const sqlQuery = "INSERT INTO transactions (customer_id, employee_id, transaction_date) VALUES (?, ?, ?)"
    return db.promise().query(sqlQuery, [customer_id, employee_id, transaction_date])
}

// GET: get transaction by ID
const getTransactionById = (id) => {
    const sqlQuery = "SELECT * FROM transactions WHERE transaction_id = ?"
    return db.promise().query(sqlQuery, [id])
}

// Update grand total amount in transaction
const updateGrandTotal = (transaction_id, grand_total) => {
    const sqlQuery = "UPDATE transactions SET grand_total = ? WHERE transaction_id = ?"
    return db.promise().query(sqlQuery, [grand_total, transaction_id])
}

// GET: get all transactions
const getAllTransactions = () => {
    const sqlQuery = "SELECT * FROM transactions"
    return db.promise().query(sqlQuery)
}

module.exports = {createTransaction, getTransactionById, updateGrandTotal, getAllTransactions}