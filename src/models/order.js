const db = require("../config/db")

// POST: create a new order
const createOrder = (newOrder) => {
    const {transaction_id, product_id, quantity, subtotal} = newOrder

    const sqlQuery = "INSERT INTO orders (transaction_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)"
    return db.promise().query(sqlQuery, [transaction_id, product_id, quantity, subtotal])
}

// Get order by transaction_id
const getOrderByTransactionId = (transaction_id) => {
    const sqlQuery = "SELECT * FROM orders WHERE transaction_id = ?"
    return db.promise().query(sqlQuery, [transaction_id])
}

module.exports = {createOrder, getOrderByTransactionId}