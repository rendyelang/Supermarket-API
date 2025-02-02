const db = require("../config/db")

// Join table transaction, customer and employee
const joinTransactionOrder = (transaction_id) => {
    const sqlQuery = `
        SELECT 
            transactions.transaction_id,
            customers.name AS customer_name, 
            employees.name AS employee_name, 
            transactions.transaction_date, 
            transactions.grand_total 
        FROM 
            transactions 
        INNER JOIN 
            customers ON transactions.customer_id = customers.customer_id 
        INNER JOIN 
            employees ON transactions.employee_id = employees.employee_id 
        WHERE 
            transactions.transaction_id = ?`
    return db.promise().query(sqlQuery, [transaction_id])
}

// To get all transactions
const getAllTransactions = async () => {
    const sqlQuery = `
        SELECT 
            transactions.transaction_id,
            transactions.transaction_date,
            employees.name AS employee_name,
            customers.name AS customer_name, 
            transactions.grand_total 
        FROM 
            transactions 
        INNER JOIN 
            customers ON transactions.customer_id = customers.customer_id 
        INNER JOIN 
            employees ON transactions.employee_id = employees.employee_id
    `
    return db.promise().query(sqlQuery)
};

// To join table orders and products
const joinOrderProduct = () => {
    const sqlQuery = `
        SELECT 
            orders.order_id,
            orders.transaction_id,
            products.name, 
            products.price, 
            orders.quantity, 
            orders.subtotal 
        FROM 
            orders 
        INNER JOIN 
            products ON orders.product_id = products.product_id
        `
    return db.promise().query(sqlQuery)
}

module.exports = {joinTransactionOrder, getAllTransactions, joinOrderProduct}