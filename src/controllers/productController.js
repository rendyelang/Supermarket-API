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

// GET product by category
const getProductByCategory = async (req, res) => {
    const category = req.query.category
    // console.log(category)

    if (!category) {
        return res.status(400).json({
            message: "Category query cannot be empty"
        })
    }

    try {
        const [data] = await productModel.getProductByCategory(category)

        if (data.length) {
            res.status(200).json({
                message: `Get product by category ${category} success`,
                data: data
            })
        } else {
            res.status(404).json({
                message: `Product with category ${category} not found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// POST: create a new product
const createProduct = async (req, res) => {
    const { category, name, price, stock_quantity } = req.body

    if (!category || !name || !price || !stock_quantity) {
        return res.status(400).json({
            message: "All field must be filled"
        })
    }

    const newProduct = {
        category,
        name,
        price,
        stock_quantity
    }

    try {
        const data = await productModel.createProduct(newProduct)

        const productWithId = {
            product_id: data[0].insertId,
            ...newProduct
        }

        res.status(201).json({
            message: "Create new product success",
            data: productWithId
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// PUT: edit a product by ID
const editProduct = async (req, res) => {
    const id = req.params.id

    const {category, name, price, stock_quantity} = req.body

    if (!category || !name || !price || !stock_quantity) {
        res.status(400).json({
            message: "All fields must be filled"
        })
    }

    try {
        const productEdited = {category, name, price, stock_quantity}
        const data = await productModel.editProduct(id, productEdited)

        if (data[0].affectedRows) {
            res.status(200).json({
                message: "Data edited successfully",
                newData: {
                    id,
                ...productEdited
                }
            })
        } else {
            res.status(404).json({
                message: `Failed edit. ID ${id} not found!`
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// DELETE - delete a product by ID
const deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        const data = await productModel.deleteProduct(id)

        if (data[0].affectedRows) {
            res.status(200).json({
                message: `Product with ID ${id} deleted`
            })
        } else {
            res.status(404).json({
                message:  `Failed delete product. ID ${id} not found`
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    editProduct,
    deleteProduct
}