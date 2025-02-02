const router = require("express").Router()
const {createTransaction, printTransactionInvoice} = require("../controllers/transactionController")
const {isAuthToken} = require("../middleware/verifyToken")
const {createOrder} = require("../controllers/orderController")

// POST - Create a new transaction
router.post("/create-transaction", isAuthToken, createTransaction)

// POST - Create a new order
router.post("/create-order", isAuthToken, createOrder)

// GET - Print transaction invoice
router.get("/transaction/invoice/:id", isAuthToken, printTransactionInvoice)

module.exports = router