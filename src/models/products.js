const db = require("../config/db")

// GET all products
const getAllProducts = () => {
    const sqlQuery = "SELECT * FROM products"
    return db.promise().query(sqlQuery)
}

// GET product by ID
const getProductById = (id) => {
    const sqlQuery = "SELECT * FROM products WHERE product_id = ?"
    return db.promise().query(sqlQuery, [id])
}

module.exports = {
    getAllProducts,
    getProductById
}