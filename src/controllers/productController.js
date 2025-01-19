const productModel = require("../models/products");

// GET all products
const getAllProducts = async (req, res) => {
    try {
        const [data] = await productModel.getAllProducts()

        res.status(200).json({
            message: "Get all products success",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// GET product by ID
const getProductById = async (req, res) => {
    const id = req.params.id
    // console.log("ID received from params:", id); // Debug ID


    try {
        const [data] = await productModel.getProductById(id)
        // console.log("Data retrieved from DB:", data); // Debug Query Result

        if (data.length) {
            res.status(200).json({
                message: "Get product by ID success",
                data: data
            })
        } else {
            res.status(404).json({
                message: "Product not found"
            })
        }
    } catch (error) {
        // console.error(error)
        res.status(500).json({
            message: "Internal server error test"
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById
}