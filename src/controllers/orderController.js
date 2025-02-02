const orderModel = require("../models/order")
const productModel = require("../models/products")
const transactionModel = require("../models/transaction")

/**
 * take req body (transaction_id, product_id, quantity)
 * check if transaction_id, product_id, quantity is empty
 * check if transaction_id is exist in transaction table
 * check if product_id is exist in product table
 * check if product stock is enough for the quantity
 * calculate subtotal
 * create new order (query to order table)
 * subtract stock quantity from product table based on order quantity
 */

// Create a new order
const createOrder = async (req, res) => {
    const {transaction_id, product_id, quantity: orderQty} = req.body

    if (!transaction_id || !product_id || !orderQty) {
        return res.status(400).json({
            message: "Required field transaction_id, product_id, and quantity"
        })
    }

    const [transaction] = await transactionModel.getTransactionById(transaction_id)
    const [product] = await productModel.getProductById(product_id)

    if (transaction.length === 0) {
        return res.status(404).json({
            message: `Transaction with id ${transaction_id} not found`
        })
    }

    if (product.length === 0) {
        return res.status(404).json({
            message: `Product with id ${product_id} not found`
        })
    }
    const {name, price, stock_quantity} = product[0]

    if (stock_quantity < orderQty) {
        return res.status(400).json({
            message: `Order for product ${name} exceeds stock quantity`,
            available_stock: stock_quantity
        })
    }

    const subtotal = price * orderQty
    const newOrder = {transaction_id, product_id, quantity: orderQty, subtotal}
    const [products] = await productModel.getProductById(product_id)

    try {
        const [order] = await orderModel.createOrder(newOrder)

        // Update stock quantity
        const [subtractStock] = await productModel.subtractStock(product_id, orderQty)

        res.status(201).json({
            message: "Create new order success",
            data: {
                order_id: order.insertId,
                transaction_id: transaction_id,
                product_detail: [
                    {
                        product_id: product_id,
                        product_name: products[0].name,
                        price: parseFloat(products[0].price),
                        quantity: orderQty,
                        subtotal: subtotal
                    }
                ]
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error!"
        })
    }

}

module.exports = {createOrder}