const db = require("../config/db")

// GET: read all products
const getAllProducts = () => {
    const sqlQuery = "SELECT * FROM products"
    const action =  db.promise().query(sqlQuery)
    return action
}

// GET: read product by ID
const getProductById = (id) => {
    const sqlQuery = "SELECT * FROM products WHERE product_id = ?"
    return db.promise().query(sqlQuery, [id])
}

//  GET: raad product by category
const getProductByCategory = (category) => {
    const sqlQuery = "SELECT * FROM products WHERE category LIKE ?"
    const keyword = `%${category}%`
    return db.promise().query(sqlQuery, [keyword])
}

// POST: create a new product
const createProduct = (newProduct) => {
    const {category, name, price, stock_quantity} = newProduct
    const sqlQueery = "INSERT INTO products (category, name, price, stock_quantity) VALUES (?, ?, ?, ?)"
    return db.promise().query(sqlQueery, [category, name, price, stock_quantity])
}

// PUT: edit a product by ID
const editProduct = (id, editedProduct) => {
    const {category, name, price, stock_quantity} = editedProduct
    const sqlQuery = "UPDATE products SET category = ?, name = ?, price = ?, stock_quantity = ? WHERE product_id = ?"
    return db.promise().query(sqlQuery, [category, name, price, stock_quantity, id])
}

// DELETE: delete product by ID
const deleteProduct = (id) => {
    const sqlQuery = "DELETE FROM products WHERE product_id = ?"
    return db.promise().query(sqlQuery, [id])
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    editProduct,
    deleteProduct
}