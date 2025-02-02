const moment = require('moment-timezone');
const transactionModel = require('../models/transaction')
const customerModel = require("../models/customer")
const employeeModel = require("../models/employee")
const orderModel = require("../models/order")
const productModel = require("../models/products")
const joinTableModel = require("../models/joinTable");
const { any } = require('joi');

// Create a new transaction
const createTransaction = async (req, res) => {
    const { customer_id, employee_id } = req.body;

    if (!customer_id || !employee_id) {
        return res.status(400).json({
            message: "Required field customer_id and employee_id"
        });
    }

    const [customer] = await customerModel.getCustById(customer_id)
    const [employee] = await employeeModel.getEmployeeById(employee_id)

    if (customer.length === 0) {
        return res.status(404).json({
            message: `Customer with id ${customer_id} not found`
        });
    }

    if (employee.length === 0) {
        return res.status(404).json({
            message: `Employee with id ${employee_id} not found`
        });
    }

    const date = new Date().toLocaleString('sv-SE').replace(' ', ':')

    const transactionData = {customer_id, employee_id, transaction_date: date};

    try {
        const [newTransaction] = await transactionModel.createTransaction(transactionData);
        res.status(201).json({
            message: "Create new transaction success",
            data: {
                transaction_id: newTransaction.insertId,
                transaction_date: date,
                cashier: [
                    { 
                        employee_id: employee[0].employee_id,
                        cashier_name: employee[0].name
                    }
                ],
                customer: [
                    {
                        customer_id: customer[0].customer_id,
                        customer_name: customer[0].name
                    }
                ],
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
};

// To print transaction invoice based on transaction id
const printTransactionInvoice = async (req, res) => {
    const id = req.params.id;

    try {
        const [transaction] = await transactionModel.getTransactionById(id);
        if (transaction.length === 0) {
            return res.status(404).json({
                message: `Transaction with id ${id} not found`
            });
        }

        const [invoice] = await joinTableModel.joinTransactionOrder(id)
        const {transaction_id, customer_name, employee_name, transaction_date} = invoice[0]
        const formattedTime = moment(transaction_date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

        const [orders] = await orderModel.getOrderByTransactionId(transaction_id)
        const {order_id, transaction_id: trns, product_id, quantity, subtotal} = orders[0]
        const [product] = await productModel.getProductById(product_id)

        let grandTotal = 0;
        orders.forEach(order => {
            grandTotal += parseFloat(order.subtotal);
        });

        // update grand_total in transactions table
        await transactionModel.updateGrandTotal(transaction_id, grandTotal);

        res.status(200).json({
            message: `Get transaction invoice success`,
            transaction_ID: transaction_id,
            transaction_date: formattedTime,
            cashier: employee_name,
            customer: customer_name,
            orders: [
                orders.map(order => ({
                    order_id: order.order_id,
                    product_id: order.product_id,
                    product_name: product[0].name,
                    price: parseFloat(product[0].price),
                    quantity: order.quantity,
                    subtotal: order.subtotal
                }))
            ],
            grand_total: parseFloat(grandTotal)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error!"
        });
    }
}

// To display all transactions
const getAllTransactions = async (req, res) => {
    try {
        const [transactions] = await joinTableModel.getAllTransactions();
        const [orders] = await joinTableModel.joinOrderProduct();

        // console.log(transactions)
        // console.log("Sekat")
        // console.log(orders)

        // Gabungkan orders ke masing-masing transaksi berdasarkan transaction_id
        const transactionsWithOrders = transactions.map(transaction => {
            const relatedOrders = orders.filter(order => order.transaction_id === transaction.transaction_id)
            const formattedTime = moment(transaction.transaction_date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')

            return {
                transaction_ID: transaction.transaction_id,
                transaction_date: formattedTime,
                cashier: transaction.employee_name,
                customer: transaction.customer_name,
                grand_total: parseFloat(transaction.grand_total),
                orders: relatedOrders.map(order => ({
                    order_id: order.order_id,
                    product_name: order.name,
                    price: parseFloat(order.price),
                    quantity: order.quantity,
                    subtotal: parseFloat(order.subtotal)
                }))
            }
        })

        res.status(200).json({
            message: "Get all transactions success",
            transactions: transactionsWithOrders
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = { createTransaction, printTransactionInvoice, getAllTransactions };