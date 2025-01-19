const express = require("express")
const {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    editProduct,
    deleteProduct
    } = require("../controllers/productController")
const router = express.Router()

// GET - Read all products data
router.get("/products", getAllProducts)

// GET - Read a product data by category
router.get("/product/search", getProductByCategory)

// GET - Read a product data by ID
router.get("/product/:id", getProductById)

// POST - Create a new product
router.post("/create-product", createProduct)

// PUT - Edit a product
router.put("/product/edit/:id", editProduct)

// DELETE = Delete a product by ID
router.delete("/product/delete/:id", deleteProduct)

module.exports = router