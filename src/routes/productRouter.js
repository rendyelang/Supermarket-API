const express = require("express")
const {getAllProducts, getProductById} = require("../controllers/productController")
const router = express.Router()

// GET - Read all products data
router.get("/products", getAllProducts)

// GET - Read a product data by ID
router.get("/product/:id", getProductById)

module.exports = router